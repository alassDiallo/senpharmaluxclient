import { TestBed } from '@angular/core/testing';

import { ServiceCollaborationService } from './service-collaboration.service';

describe('ServiceCollaborationService', () => {
  let service: ServiceCollaborationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServiceCollaborationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
