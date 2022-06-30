import { TestBed } from '@angular/core/testing';

import { ServicedetailcategorieService } from './servicedetailcategorie.service';

describe('ServicedetailcategorieService', () => {
  let service: ServicedetailcategorieService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServicedetailcategorieService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
