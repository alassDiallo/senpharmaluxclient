import { TestBed } from '@angular/core/testing';

import { CodegeographiqueService } from './codegeographique.service';

describe('CodegeographiqueService', () => {
  let service: CodegeographiqueService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CodegeographiqueService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
