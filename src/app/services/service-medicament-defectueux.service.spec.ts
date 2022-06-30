import { TestBed } from '@angular/core/testing';

import { ServiceMedicamentDefectueuxService } from './service-medicament-defectueux.service';

describe('ServiceMedicamentDefectueuxService', () => {
  let service: ServiceMedicamentDefectueuxService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServiceMedicamentDefectueuxService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
