import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MarkerMapComponent } from './marker-map/marker-map.component';
import { PopupMapComponent } from './popup-map/popup-map.component';
import { SpeedTestMapComponent } from './speed-test-map/speed-test-map.component';

const routes: Routes = [
  {
    path: 'markers',
    component: MarkerMapComponent
  },
  {
    path: 'popups',
    component: PopupMapComponent
  },
  {
    path: 'speed-test',
    component: SpeedTestMapComponent
  },
  {
    path: '**',
    redirectTo: 'markers'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
