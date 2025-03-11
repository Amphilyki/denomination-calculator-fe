import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-denomination-table',
  imports: [CommonModule],
  templateUrl: './denomination-table.component.html',
  styleUrl: './denomination-table.component.css',
})
export class DenominationTableComponent {
  @Input() denominationValues: any;
}
