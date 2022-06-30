import { TestBed } from '@angular/core/testing';

import { ServicebonClientService } from './ServicebonClientService';

describe('ServiceboncommandeService', () => {
  let service: ServicebonClientService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServicebonClientService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
