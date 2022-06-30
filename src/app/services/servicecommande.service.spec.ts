import { TestBed } from '@angular/core/testing';

import { ServicecommandeService } from './servicecommande.service';

describe('ServicecommandeService', () => {
  let service: ServicecommandeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServicecommandeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
