import { TestBed } from '@angular/core/testing';

import { ServiceformeService } from './serviceforme.service';

describe('ServiceformeService', () => {
  let service: ServiceformeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServiceformeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
