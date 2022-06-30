import { TestBed } from '@angular/core/testing';

import { ServiceauthentificationService } from './serviceauthentification.service';

describe('ServiceauthentificationService', () => {
  let service: ServiceauthentificationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServiceauthentificationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
