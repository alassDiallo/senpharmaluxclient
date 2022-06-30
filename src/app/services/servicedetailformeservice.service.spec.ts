import { TestBed } from '@angular/core/testing';

import { ServicedetailformeserviceService } from './servicedetailformeservice.service';

describe('ServicedetailformeserviceService', () => {
  let service: ServicedetailformeserviceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServicedetailformeserviceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
