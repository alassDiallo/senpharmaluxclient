import { TestBed } from '@angular/core/testing';

import { ServiceMedicamentPerimesService } from './service-medicament-perimes.service';

describe('ServiceMedicamentPerimesService', () => {
  let service: ServiceMedicamentPerimesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServiceMedicamentPerimesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
