import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DenominationCalculationComponent } from './denomination-calculation.component';

describe('DenominationCalculationComponent', () => {
  let component: DenominationCalculationComponent;
  let fixture: ComponentFixture<DenominationCalculationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DenominationCalculationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DenominationCalculationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
