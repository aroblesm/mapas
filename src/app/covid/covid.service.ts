import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CovidService {
  urlState : string = 'https://corona.lmao.ninja/v2/states/';
  urlState2 : string = '?yesterday=true'

  constructor(private httpClient : HttpClient ) { }
  
  getJson(state: string){
    return this.httpClient.get(this.urlState + state + this.urlState2);
  }

  getAllStates(){
    return this.httpClient.get('https://corona.lmao.ninja/v2/states?sort=&yesterday=true');
  }
}
