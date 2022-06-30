import { TestBed } from '@angular/core/testing';

import { VendeurmiddlewareService } from './vendeurmiddleware.service';

describe('VendeurmiddlewareService', () => {
  let service: VendeurmiddlewareService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VendeurmiddlewareService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
