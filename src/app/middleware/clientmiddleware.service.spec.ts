import { TestBed } from '@angular/core/testing';

import { ClientmiddlewareService } from './clientmiddleware.service';

describe('ClientmiddlewareService', () => {
  let service: ClientmiddlewareService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ClientmiddlewareService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
