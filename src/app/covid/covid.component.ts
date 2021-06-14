import { Component, OnInit } from '@angular/core';
import { CovidService } from './covid.service';

@Component({
  selector: 'app-covid',
  templateUrl: './covid.component.html',
  styleUrls: ['./covid.component.css']
})
export class CovidComponent implements OnInit {
  californiaInfo: any;
  california: number;
  allStates: Object;

  constructor(private covidService : CovidService) { }

  ngOnInit(): void {
    this.getCovidData();
    this.getAllStates();
  }

  getCovidData(): void{
    this.covidService.getJson('California').subscribe((res: any) => {
      this.californiaInfo = JSON.parse(JSON.stringify(res));
      this.california = this.californiaInfo.active
      });
  }

  getAllStates(): void{
    this.covidService.getAllStates().subscribe((res: any) => {
      this.allStates = res;
    });
  }

}
