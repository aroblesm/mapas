import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as L from 'leaflet';
import { PopUpService } from './popup.service';
import { CovidService } from './covid/covid.service';


@Injectable({
  providedIn: 'root'
})
export class MarkerService {
  capitals: string = '/assets/data/usa-capitals.geojson';
  constructor(
    private http: HttpClient,
    private popupService: PopUpService,
    private covidService: CovidService
  ) { }
  static scaledRadius(val: number, maxVal: number): number {
    return 20 * (val / maxVal);
  }

  makeCapitalMarkers(map: L.map): void {
    this.http.get(this.capitals).subscribe((res: any) => {
      for (const c of res.features) {
        const lon = c.geometry.coordinates[0];
        const lat = c.geometry.coordinates[1];
        const marker = L.marker([lat, lon]);

        marker.addTo(map);
      }
    });
  }

  makeCapitalCircleMarkers(map: L.map): void {
    var stateInfo: any;
    this.http.get(this.capitals).subscribe((res: any) => {
      res.features[0].properties.cases = 10000;
      const maxPop = Math.max(...res.features.map(x => x.properties.cases), 0);
      
      for (const c of res.features) {
        this.covidService.getJson(c.properties.state).subscribe((res: any) => {
          stateInfo = JSON.parse(JSON.stringify(res));
          c.properties.cases = stateInfo.todayCases as number;
          const lon = c.geometry.coordinates[0];
          const lat = c.geometry.coordinates[1];
          const circle = L.circleMarker([lat, lon], {
          radius: MarkerService.scaledRadius(c.properties.cases, maxPop)
        });
        circle.bindPopup(this.popupService.makeCapitalPopup(c.properties));
        circle.addTo(map);
          });
      }
    });
  }
}