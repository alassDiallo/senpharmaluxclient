import { TestBed } from '@angular/core/testing';

import { ServicerayonService } from './servicerayon.service';

describe('ServicerayonService', () => {
  let service: ServicerayonService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServicerayonService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
