import { TestBed } from '@angular/core/testing';

import { ServicecategorieService } from './servicecategorie.service';

describe('ServicecategorieService', () => {
  let service: ServicecategorieService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServicecategorieService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
