import { TestBed } from '@angular/core/testing';

import { UrlconnexionService } from './urlconnexion.service';

describe('UrlconnexionService', () => {
  let service: UrlconnexionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UrlconnexionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
