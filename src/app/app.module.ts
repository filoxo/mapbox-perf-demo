import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MarkerMapComponent } from './marker-map/marker-map.component';
import { PopupMapComponent } from './popup-map/popup-map.component';

@NgModule({
  declarations: [
    AppComponent,
    MarkerMapComponent,
    PopupMapComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
