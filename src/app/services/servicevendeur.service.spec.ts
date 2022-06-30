import { TestBed } from '@angular/core/testing';

import { ServicevendeurService } from './servicevendeur.service';

describe('ServicevendeurService', () => {
  let service: ServicevendeurService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServicevendeurService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
