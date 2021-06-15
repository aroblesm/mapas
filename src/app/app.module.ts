import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { HttpClientModule } from '@angular/common/http';
import { MarkerService } from './marker.service';
import { PopUpService } from './popup.service';
import { ShapeService } from './shape.service';

import { AppComponent } from './app.component';
import { MapComponent } from './map/map.component';
import { AppRoutingModule } from './app-routing.module';
import { CovidComponent } from './covid/covid.component';
import { GraphQLModule } from './graphql.module';
import { GqlcovidComponent } from './gqlcovid/gqlcovid.component';
import { LandingPageComponent } from './landing-page/landing-page.component'

@NgModule({
  declarations: [
    AppComponent,
    MapComponent,
    CovidComponent,
    GqlcovidComponent,
    LandingPageComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    GraphQLModule
  ],
  providers: [
    MarkerService,
    PopUpService,
    ShapeService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }