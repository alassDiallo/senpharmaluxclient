import { TestBed } from '@angular/core/testing';

import { ServicedepenseService } from './servicedepense.service';

describe('ServicedepenseService', () => {
  let service: ServicedepenseService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServicedepenseService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
