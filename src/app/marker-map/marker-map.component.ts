import { Component, OnInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import 'rxjs/add/observable/fromEvent';

import { MapComponent } from '../shared/map/map.component';
import { Cluster, ClusterManager } from '../shared/cluster';
import { timePeriod } from '../data.mock';

const BIRTH_LOCATIONS = 'birthLocations';

@Component({
  selector: 'app-marker-map',
  templateUrl: './marker-map.component.html',
  styleUrls: ['./marker-map.component.css']
})
export class MarkerMapComponent implements OnInit {
  @ViewChild('map') map: MapComponent;

  private clusterLvl = 1;
  private clusters: Cluster[] = [];
  private clusterManager: ClusterManager;
  private markers: mapboxgl.Marker[] = [];
  private markerElements: HTMLElement[] = [];
  private zoomEventsSub: Subscription;

  constructor() { }

  ngOnInit() {
  }

  initializeMap() {
    if (this.map.map.getLayer(BIRTH_LOCATIONS)) {
      this.map.map.setLayoutProperty(BIRTH_LOCATIONS, 'visibility', (timePeriod.points.length > 0) ? 'none' : 'visible');
    };
    this.loadTimePeriodData(timePeriod);
    this.zoomEventsSub = Observable.fromEvent(this.map.map, 'zoom').subscribe(() => {
      console.log('map was zoomed')
      const level = Math.floor(this.map.map.getZoom());
      if (level !== this.clusterLvl) {
        this.clusterLvl = level;
        this.getClusters(this.clusterLvl);
      }
    });
  }

  private loadTimePeriodData(timePeriod) {
    this.clusterManager = new ClusterManager();
    if (timePeriod.ancestors) {
      timePeriod.ancestors.forEach((ancestor, i) => {
        if ((ancestor.birthPlace && ancestor.birthPlace.placeId) || (ancestor.deathPlace && ancestor.deathPlace.placeId)) {
          // tslint:disable-next-line:max-line-length
          this.clusterManager.addNode((ancestor.birthPlace && ancestor.birthPlace.placeId) ? ancestor.birthPlace.coords : ancestor.deathPlace.coords, i);
        }
      });
    }
    this.getClusters(this.clusterLvl);
  }

  private getClusters(level) {
    this.markers.forEach(marker => marker.remove());
    this.markers = [];
    this.markerElements = [];
    this.clusters = this.clusterManager.getClusters(level);
    this.clusters.forEach(cluster => {
      const el: HTMLElement = document.createElement('div');
      el.className = 'marker';
      if (cluster.data.length === 1) {
        const ancestor = timePeriod.ancestors[cluster.data[0]];
        el.classList.add(ancestor.gender.toLowerCase());
        let classes = '';
        if (!ancestor.photoUrl) {
          classes += 'icon ';
          classes += this.getGenderClass(ancestor.gender);
        }
        let markerHtml = `<div class="photo photoSizeMarker photoCenter photoCircle ${classes}" role="presentation">`;
        if (ancestor.photoUrl) {
          markerHtml += `<img src="${ancestor.photoUrl}"/>`;
        }
        markerHtml += '</div>';
        el.innerHTML = markerHtml;

      } else {
        el.innerHTML = '<span>' + cluster.data.length + '</span>';
      }
      // add marker to map
      const marker = new mapboxgl.Marker(el, { offset: [-17, -44] })
        .setLngLat(cluster.lngLat)
        .addTo(this.map.map);

      this.markers.push(marker);
      this.markerElements.push(el);
    });
  }

  private getGenderClass(gender: string): string {
    return gender === 'MALE' ? 'iconMale' : (gender === 'FEMALE' ? 'iconFemale' : 'iconPerson');
  }
}
