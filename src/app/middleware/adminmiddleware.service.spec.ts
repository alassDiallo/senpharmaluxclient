import { TestBed } from '@angular/core/testing';

import { AdminmiddlewareService } from './adminmiddleware.service';

describe('AdminmiddlewareService', () => {
  let service: AdminmiddlewareService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AdminmiddlewareService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
