import { TestBed } from '@angular/core/testing';

import { ServicemedicamentService } from './servicemedicament.service';

describe('ServicemedicamentService', () => {
  let service: ServicemedicamentService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServicemedicamentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
