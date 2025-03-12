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
});
