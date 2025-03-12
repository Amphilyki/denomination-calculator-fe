import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export default class ApiService {
  http = inject(HttpClient);
  backendUrl: string = 'http://localhost:8080/euro-denomination-calculator/';

  getDenominations(amount: number) {
    const url = this.backendUrl + amount;
    console.log('sending GET request to ' + url);
    return this.http.get<Map<string, number>>(url);
  }

  getDenominationsDifference(newAmount: number, oldAmount: number) {
    const url = this.backendUrl + newAmount + '/difference-from/' + oldAmount;
    console.log('sending GET request to ' + url);
    return this.http.get<Map<string, number>>(url);
  }
}
