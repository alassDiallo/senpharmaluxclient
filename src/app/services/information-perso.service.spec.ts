import { TestBed } from '@angular/core/testing';

import { InformationPersoService } from './information-perso.service';

describe('InformationPersoService', () => {
  let service: InformationPersoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InformationPersoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
