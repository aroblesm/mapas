import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PopUpService {
  constructor() { }

  makeCapitalPopup(data: any): string {
    return `` +
      `<div>State: ${ data.state }</div>` +
      `<div>Cases: ${ data.cases }</div>`
  }
}