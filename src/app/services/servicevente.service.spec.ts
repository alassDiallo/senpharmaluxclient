import { TestBed } from '@angular/core/testing';

import { ServiceventeService } from './servicevente.service';

describe('ServiceventeService', () => {
  let service: ServiceventeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServiceventeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
