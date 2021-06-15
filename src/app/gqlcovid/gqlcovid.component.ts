import { Component, OnInit } from '@angular/core';
import { GqlcovidService } from './gqlcovid.service';

@Component({
  selector: 'app-gqlcovid',
  templateUrl: './gqlcovid.component.html',
  styleUrls: ['./gqlcovid.component.css']
})
export class GqlcovidComponent implements OnInit {
  
  constructor(private gqlcovidService: GqlcovidService) { }
   data$ = this.gqlcovidService.countryData$;
   confirmed$ = this.gqlcovidService.confirmed$;
   deaths$ = this.gqlcovidService.deaths$;
   growthRate$ = this.gqlcovidService.growthRate$;


  ngOnInit(): void {
    
  }

}
