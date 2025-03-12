import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import apiService from './api.service';

describe('ApiService', () => {
  let service: apiService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [apiService],
    });
    service = TestBed.inject(apiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
