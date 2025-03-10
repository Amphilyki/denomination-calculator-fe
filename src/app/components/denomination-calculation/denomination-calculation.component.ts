import { Component, inject, OnInit } from '@angular/core';
import ApiService from '../../services/api.service';
import { DenominationTableComponent } from '../denomination-table/denomination-table.component';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-denomination-calculation',
  imports: [DenominationTableComponent, FormsModule ],
  templateUrl: './denomination-calculation.component.html',
  styleUrl: './denomination-calculation.component.css',
  providers: [ApiService]
})


export class DenominationCalculationComponent implements OnInit{

  denominationCalculatorService = inject(ApiService);
  denominations :  Map<string, number> = (new Map);
  differenceInDenominations : Map<string, number> = (new Map);
  amountsHistory :  number[] = [0];
  newAmount: number = 0;
  oldAmount: number = 0;
  
  availableDenominations : number[] = [200, 100, 50, 20, 10, 5, 2, 1, 0.5, 0.2, 0.1, 0.05, 0.02, 0.01];

  ngOnInit(): void {
    this.denominations= new Map([
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
  } 


  calculateDenomination(){
    let amount : number = this.newAmount;
    this.amountsHistory.unshift(this.newAmount);
    this.oldAmount = this.amountsHistory[1];
    if (this.amountsHistory.length>2) {
      this.amountsHistory.pop();
    }
    const calculatedDenominations: Map<string, number> = this.calculateDenominationsForAmount(amount);
  this.denominations = calculatedDenominations;
  }

     calculateDenominationsForAmount(amount: number) {
      const calculatedDenominations: Map<string, number> = new Map;

      for (let nextDenomination of this.availableDenominations) {
        let nextDenominationAsNumber: number = Number(nextDenomination);
        if (amount >= nextDenominationAsNumber) {
          var value = 0;
          while (amount >= nextDenominationAsNumber) {
            value++;
            amount = amount - nextDenominationAsNumber;
          }
          calculatedDenominations.set(nextDenomination.toString(), value);
        }
      }
      return calculatedDenominations;
    }


  calculateDifference(){
    const differenceInDenominations: Map<string, number> = new Map;
    const newDenominations = this.calculateDenominationsForAmount(this.newAmount);
    const oldDenominations = this.calculateDenominationsForAmount(this.oldAmount);

    newDenominations.forEach((value: number, key: string ) => {
      let oldValue = oldDenominations.get(key);
      if (oldValue == null){
        differenceInDenominations.set(key, value);
      }
      if (oldValue!=null){
        let difference = oldValue-value;
        differenceInDenominations.set(key, -difference);
        oldDenominations.delete(key);
      }
    });
    if (oldDenominations.size>0){
      oldDenominations.forEach((value: number, key: string ) => {
        differenceInDenominations.set(key, -value);
      });
    }
    this.differenceInDenominations = differenceInDenominations;
  }

}
