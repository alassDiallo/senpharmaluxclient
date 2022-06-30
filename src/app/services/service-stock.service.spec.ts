import { TestBed } from '@angular/core/testing';

import { ServiceStockService } from './service-stock.service';

describe('ServiceStockService', () => {
  let service: ServiceStockService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServiceStockService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
