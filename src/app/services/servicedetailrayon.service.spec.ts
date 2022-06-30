import { TestBed } from '@angular/core/testing';

import { ServicedetailrayonService } from './servicedetailrayon.service';

describe('ServicedetailrayonService', () => {
  let service: ServicedetailrayonService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServicedetailrayonService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
