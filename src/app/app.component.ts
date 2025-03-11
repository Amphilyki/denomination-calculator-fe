import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './components/header/header.component';
import { DenominationCalculationComponent } from './components/denomination-calculation/denomination-calculation.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HeaderComponent, DenominationCalculationComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'denomination-calculator-fe';
}
