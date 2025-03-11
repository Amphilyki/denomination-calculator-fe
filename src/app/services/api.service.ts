import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export default class ApiService {

  http = inject(HttpClient);

  getDenominations( amount: number){
    const url = 'http://localhost:8080/euro-denomination-calculator/' + amount;
    console.log('sending GET request to ' + url);
    return this.http.get<Map<string, number>>(url); 
  }

  getDenominationsDifference(newAmount: number, oldAmount : number){
    const url = 'http://localhost:8080/euro-denomination-calculator/' + newAmount + '/difference-from/' + oldAmount;
    console.log('sending GET request to ' + url);
    return this.http.get<Map<string, number>>(url); 
  }

}
