import { Component } from '@angular/core';
declare var mapboxgl: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  version: string;
  supported: string;
  ngOnInit() {
    this.version = mapboxgl.version;
    this.supported = mapboxgl.supported().toString();
  }
}
