import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import apiService from './api.service';

describe('ApiService', () => {
  let httpController: HttpTestingController;
  let service: apiService;
  let url = 'http://localhost:8080/euro-denomination-calculator/';
  let response: Map<string, number> = new Map([['200.00', 1]]);

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [apiService],
    });
    service = TestBed.inject(apiService);
    httpController = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should call getDenominations and return an map', () => {
    service.getDenominations(1).subscribe((res) => {
      expect(res).toEqual(response);
    });
    const req = httpController.expectOne({
      method: 'GET',
      url: `${url}1`,
    });

    req.flush(response);
  });

  it('should call getDenominationsDifference and return an map', () => {
    service.getDenominationsDifference(1, 2).subscribe((res) => {
      expect(res).toEqual(response);
    });
    const req = httpController.expectOne({
      method: 'GET',
      url: `${url}1/difference-from/2`,
    });
    req.flush(response);
  });
});
