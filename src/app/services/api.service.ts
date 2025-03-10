import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export default class ApiService {

  denominationsPlaceholder: Map<string, number> = new Map([
    ['200.0', 0],
    ['100.0', 0],
    ['50.0', 0],
    ['20', 0],
    ['10', 0],
    ['5.0', 0],
    ['2.0', 0],
    ['1', 0],
    ['0.5', 0],
    ['0.2', 0],
    ['0.1', 0],
    ['0.05', 0],
    ['0.02', 0],
    ['0.01', 0]
  ]);
  
  getDenominations(){
    return this.denominationsPlaceholder;
  }

  getDenominationsDifference(){
    return this.denominationsPlaceholder
  }

  ngOnInit(): void {
  }

}
