import { TestBed } from '@angular/core/testing';

import { ServicefournisseurService } from './servicefournisseur.service';

describe('ServicefournisseurService', () => {
  let service: ServicefournisseurService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServicefournisseurService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
