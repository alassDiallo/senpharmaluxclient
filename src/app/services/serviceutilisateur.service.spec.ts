import { TestBed } from '@angular/core/testing';

import { ServiceutilisateurService } from './serviceutilisateur.service';

describe('ServiceutilisateurService', () => {
  let service: ServiceutilisateurService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServiceutilisateurService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
