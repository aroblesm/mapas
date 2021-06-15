import { Injectable } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { BehaviorSubject } from 'rxjs';
import { take, tap } from 'rxjs/operators';
const QUERY = gql `
{
  results(countries: ["US"], date: { eq: "2021/05/05" }) {
    country {
      name
    }
    date
    confirmed
    deaths
    growthRate
  }
}
`;

@Injectable({
  providedIn: 'root'
})
export class GqlcovidService {
private countryDataSubject = new BehaviorSubject<any>(null);
countryData$ = this.countryDataSubject.asObservable(); 

private confirmedCases = new BehaviorSubject<any>(null);
confirmed$ = this.confirmedCases.asObservable();

private deathsCases = new BehaviorSubject<any>(null);
deaths$ = this.deathsCases.asObservable();

private growthRateCases = new BehaviorSubject<any>(null);
growthRate$ = this.growthRateCases.asObservable();

public deaths : number;
public growthRate : number;

  constructor(private apllo: Apollo) {
    this.getDataGql();
   }

  private getDataGql():void{
    this.apllo.watchQuery<any>({
      query: QUERY
    }).valueChanges.pipe(
    take(1),
    tap(({data}) => {
      const {results} = data;

      this.countryDataSubject.next(results[0]);
      this.confirmedCases.next(results[0].confirmed);
      this.deathsCases.next(results[0].deaths);
      this.growthRateCases.next(results[0].growthRate);
      console.log(results);
     // this.confirmedCases.next(results[0].confirmed);
      //this.confirmed = data.results[0].confirmed;
    })
    ).subscribe();

  }
  
  
}
