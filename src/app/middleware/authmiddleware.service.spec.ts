import { TestBed } from '@angular/core/testing';

import { AuthmiddlewareService } from './authmiddleware.service';

describe('AuthmiddlewareService', () => {
  let service: AuthmiddlewareService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuthmiddlewareService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
