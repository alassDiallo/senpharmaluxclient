import { TestBed } from '@angular/core/testing';

import { ServicedetailcommandeFournisseurService } from './servicedetailcommande-fournisseur.service';

describe('ServicedetailcommandeFournisseurService', () => {
  let service: ServicedetailcommandeFournisseurService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServicedetailcommandeFournisseurService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
