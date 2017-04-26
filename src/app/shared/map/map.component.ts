import { Component, AfterViewInit, Input, Output, EventEmitter, NgZone } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';

let nextId = 0;

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements AfterViewInit {
  static accessToken = 'pk.eyJ1IjoiYW5jZXN0cnltYXBib3giLCJhIjoiNllqcGhKYyJ9.p9QKjx4kc2E_55jLTmDw0Q';
  static defaultOpts = {
    attributionControl: false,
    maxZoom: 6,
    minZoom: 1,
    maxBounds: [[-270, -85], [270, 85]],
    dragRotate: false,
    touchZoomRotate: true,
    doubleClickZoom: true,
    style: 'mapbox://styles/ancestrymapbox/cil1ctovd009pavm17fsttysd',
    trackResize: true
  };

  map: mapboxgl.Map;
  supported = true;
  id: string;

  @Input() options: {};
  @Output() onLoad: EventEmitter<any> = new EventEmitter();

  constructor(private ngZone: NgZone) {
    this.id = `map-${nextId++}`;
  }

  ngAfterViewInit() {
    (<any>mapboxgl).accessToken = MapComponent.accessToken;
    this.supported = mapboxgl.supported();
    if (!this.supported) {
      // handle unsupported
    } else {
      const opts = Object.assign({}, MapComponent.defaultOpts, this.options, { container: this.id });
      this.ngZone.runOutsideAngular(() => {
        this.map = new mapboxgl.Map(opts);
        this.map.touchZoomRotate.disableRotation();
        this.map.addControl(new mapboxgl.NavigationControl(), 'bottom-left');
        this.map.addControl(new mapboxgl.AttributionControl({ compact: true }), 'bottom-right');
        this.map.once('load', () => {
          this.onLoad.emit({});
        });
        this.map.resize();
      });
    }
  }

    ngOnDestroy() {
        if (this.map !== undefined) {
            this.ngZone.runOutsideAngular(() => this.map.remove());
        }
    }

}
