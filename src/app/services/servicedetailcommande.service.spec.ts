import { TestBed } from '@angular/core/testing';

import { ServicedetailcommandeService } from './servicedetailcommande.service';

describe('ServicedetailcommandeService', () => {
  let service: ServicedetailcommandeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServicedetailcommandeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
