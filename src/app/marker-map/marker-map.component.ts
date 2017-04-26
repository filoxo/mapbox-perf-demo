import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-marker-map',
  templateUrl: './marker-map.component.html',
  styleUrls: ['./marker-map.component.css']
})
export class MarkerMapComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  initializeMap() {
    console.log('marker-map initialized')
  }
}
