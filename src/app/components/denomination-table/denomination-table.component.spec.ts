import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DenominationTableComponent } from './denomination-table.component';

describe('DenominationTableComponent', () => {
  let component: DenominationTableComponent;
  let fixture: ComponentFixture<DenominationTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DenominationTableComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DenominationTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
