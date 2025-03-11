import { Component, inject, OnInit } from '@angular/core';
import ApiService from '../../services/api.service';
import { DenominationTableComponent } from '../denomination-table/denomination-table.component';
import { FormsModule } from '@angular/forms';
import { catchError } from 'rxjs';

@Component({
  selector: 'app-denomination-calculation',
  imports: [DenominationTableComponent, FormsModule],
  templateUrl: './denomination-calculation.component.html',
  styleUrl: './denomination-calculation.component.css',
  providers: [ApiService],
})
export class DenominationCalculationComponent implements OnInit {
  apiService = inject(ApiService);
  quantityString: string = 'Quantity';
  differenceString: string = 'Difference';
  denominations: Map<string, number> = new Map();
  differenceInDenominations: Map<string, number> = new Map();
  amountsHistory: number[] = [0];
  insertedAmount: number = 0;
  newAmount: number = 0;
  oldAmount: number = 0;
  calculation: string = 'backend';

  availableDenominations: string[] = [
    '200.00',
    '100.00',
    '50.00',
    '20.00',
    '10.00',
    '5.00',
    '2.00',
    '1.00',
    '0.50',
    '0.20',
    '0.10',
    '0.05',
    '0.02',
    '0.01',
  ];

  ngOnInit(): void {
    this.denominations = new Map([
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
      ['0.01', 0],
    ]);
    this.calculation = 'backend';
  }

  calculateDenomination() {
    this.newAmount = this.insertedAmount;
    if (this.calculation === 'backend') {
      this.apiService
        .getDenominations(this.newAmount)
        .pipe(
          catchError((err) => {
            console.log(err);
            throw err;
          })
        )
        .subscribe((result) => {
          this.denominations = result;
        });
    } else {
      const calculatedDenominations: Map<string, number> =
        this.calculateDenominationsForAmount(this.newAmount);
      this.denominations = calculatedDenominations;
    }
    this.amountsHistory.unshift(this.newAmount);
    this.oldAmount = this.amountsHistory[1];
    if (this.amountsHistory.length > 2) {
      this.amountsHistory.pop();
    }
    this.differenceInDenominations = new Map();
  }

  calculateDenominationsForAmount(amount: number) {
    const calculatedDenominations: Map<string, number> = new Map();

    for (let nextDenomination of this.availableDenominations) {
      amount = Math.round((amount + Number.EPSILON) * 100) / 100;
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

  calculateDifference() {
    if (this.calculation === 'backend') {
      this.apiService
        .getDenominationsDifference(this.newAmount, this.oldAmount)
        .pipe(
          catchError((err) => {
            console.log(err);
            throw err;
          })
        )
        .subscribe((result) => {
          this.differenceInDenominations = result;
        });
    } else {
      const differenceInDenominations: Map<string, number> = new Map();
      const newDenominations = this.calculateDenominationsForAmount(
        this.newAmount
      );
      const oldDenominations = this.calculateDenominationsForAmount(
        this.oldAmount
      );
      for (let nextDenomination of this.availableDenominations) {
        let oldValue = oldDenominations.get(nextDenomination);
        let newValue = newDenominations.get(nextDenomination);
        if (oldValue == null && newValue != null) {
          differenceInDenominations.set(nextDenomination, newValue);
        }
        if (oldValue != null && newValue == null) {
          differenceInDenominations.set(nextDenomination, -oldValue);
        }
        if (oldValue != null && newValue != null) {
          let difference = oldValue - newValue;
          differenceInDenominations.set(nextDenomination, -difference);
        }
      }
      this.differenceInDenominations = differenceInDenominations;
    }
  }
}
