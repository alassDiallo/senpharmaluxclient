import { TestBed } from '@angular/core/testing';

import { ServiceformeMedicamentService } from './serviceforme-medicament.service';

describe('ServiceformeMedicamentService', () => {
  let service: ServiceformeMedicamentService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServiceformeMedicamentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
