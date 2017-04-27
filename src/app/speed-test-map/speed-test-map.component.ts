import { Component, ViewChild } from '@angular/core';

import { MapComponent } from '../shared/map/map.component';

const LIMIT = 1000;

@Component({
  selector: 'app-speed-test-map',
  templateUrl: './speed-test-map.component.html',
  styleUrls: ['./speed-test-map.component.css']
})
export class SpeedTestMapComponent {
  @ViewChild('map') map: MapComponent;

  ready = false;

  constructor() { }

  mapReady() {
    this.ready = true;
  }

  startMarkersTest() {
    console.log('Markers test start.');
    for (let i = 0; i < LIMIT; i++) {
      // Create dom content
      let el = document.createElement('div');
      el.className = 'marker';
      el.innerHTML = '<span>0</span>';
      // add marker to map
      const marker = new mapboxgl.Marker(el, { offset: [-17, -44] })
        .setLngLat([-73.9749, 40.7736])
        .addTo(this.map.map);

      setTimeout(() => {
        // Dereference content
        el.remove();
        el = null;
        // Delete marker
        marker.remove();
      });
    }
    console.log('Markers test complete.');
  }

  startPopupsTest() {
    console.log('Popups test complete.');
    for (let i = 0; i < LIMIT; i++) {
      // Create content
      let domElem = document.createElement('div');
      domElem.innerHTML = 'TEST CONTENT';
      // Create popup
      const popup = new mapboxgl.Popup({ offset: { 'top': [-3, -10], 'bottom': [-3, -40] } })
        .setLngLat([-96, 37.8])
        .setDOMContent(domElem)
        .addTo(this.map.map);

      setTimeout(() => {
        // Dereference content
        domElem.remove();
        domElem = null;
        // Delete popup
        popup.remove();
      });
    }
    console.log('Popups test complete.');
  }

  deleteMap() {
    this.map.map.remove();
  }

  runTests() {
    this.startMarkersTest();
    this.startPopupsTest();
    this.deleteMap()
  }
}
