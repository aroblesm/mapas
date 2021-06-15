import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CovidComponent } from './covid/covid.component';
import { GqlcovidComponent } from './gqlcovid/gqlcovid.component';
import { MapComponent } from './map/map.component';
import { LandingPageComponent } from './landing-page/landing-page.component';


const routes: Routes = [
  { path: '', component: LandingPageComponent },
  { path: 'map', component: MapComponent },
  { path: 'covid', component: CovidComponent },
  { path: 'gql', component: GqlcovidComponent },
  { path: 'lp', component: LandingPageComponent }  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }