import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import ApiService from '../../services/api.service';
import { DenominationCalculationComponent } from './denomination-calculation.component';

describe('DenominationCalculationComponent', () => {
  let component: DenominationCalculationComponent;
  let fixture: ComponentFixture<DenominationCalculationComponent>;
  let apiServiceInstance: ApiService;
  let httpTestingController: HttpTestingController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, DenominationCalculationComponent],
      providers: [ApiService],
    }).compileComponents();

    fixture = TestBed.createComponent(DenominationCalculationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    apiServiceInstance = TestBed.inject(ApiService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('get denomination for 256.88, calculation in frontend', () => {
    let expectedResult = new Map([
      ['200.00', 1],
      ['50.00', 1],
      ['5.00', 1],
      ['1.00', 1],
      ['0.50', 1],
      ['0.20', 1],
      ['0.10', 1],
      ['0.05', 1],
      ['0.02', 1],
      ['0.01', 1],
    ]);
    component.calculation = 'frontend';
    component.insertedAmount = 256.88;
    component.calculateDenomination();
    expect(component.denominations).toEqual(expectedResult);
    expect(component.newAmount).toEqual(256.88);
  });

  it('get denomination for amount updates amount history', () => {
    component.calculation = 'frontend';
    component.oldAmount = 123;
    component.insertedAmount = 456;
    component.calculateDenomination();
    expect(component.newAmount).toEqual(456);
    component.insertedAmount = 789;
    component.calculateDenomination();
    expect(component.newAmount).toEqual(789);
    expect(component.oldAmount).toEqual(456);
  });

  it('get denomination for amount negative amount does not update amounts history', () => {
    component.calculation = 'frontend';
    component.oldAmount = 123;
    component.newAmount = 456;
    component.insertedAmount = -456;
    component.calculateDenomination();
    expect(component.newAmount).toEqual(456);
    expect(component.oldAmount).toEqual(123);
  });

  it('get difference in denomination for 256.88 and 67.32, calculation in frontend', () => {
    let expectedResult = new Map([
      ['200.00', 1],
      ['50.00', 0],
      ['10.00', -1],
      ['5.00', 0],
      ['2.00', -1],
      ['1.00', 1],
      ['0.50', 1],
      ['0.20', 0],
      ['0.10', 0],
      ['0.05', 1],
      ['0.02', 0],
      ['0.01', 1],
    ]);
    component.calculation = 'frontend';
    component.newAmount = 256.88;
    component.oldAmount = 67.32;
    component.calculateDifference();
    expect(component.differenceInDenominations).toEqual(expectedResult);
  });


});
