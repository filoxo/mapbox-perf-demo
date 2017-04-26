import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

import { timePeriod } from '../data.mock';
import { MapComponent } from '../shared/map/map.component';

@Component({
  selector: 'app-popup-map',
  templateUrl: './popup-map.component.html',
  styleUrls: ['./popup-map.component.css']
})
export class PopupMapComponent implements OnInit {
  @ViewChild('map') map: MapComponent;
  @ViewChild('ancestorDetail') ancestorDetailPopover: ElementRef;
  @ViewChild('ancestorList') ancestorListPopover: ElementRef;

  ancestors: any[];

  private popup: mapboxgl.Popup;
  private selectedAncestor: any;

  constructor() { }

  ngOnInit() {
    this.ancestors = timePeriod.ancestors;
  }

  selectAncestor(ancestor) {
    if (this.popup !== undefined && this.popup.isOpen()) {
      this.popup.remove();
    }
    this.selectedAncestor = ancestor;
    this.popup = new mapboxgl.Popup({ offset: { 'top': [-3, -10], 'bottom': [-3, -40] } })
      .setLngLat([-96, 37.8])
      .setDOMContent(this.ancestorDetailPopover.nativeElement)
      .addTo(this.map.map);
    this.popup.once('close', event => {
      this.selectedAncestor = null;
    });
  }
}
