import { TestBed } from '@angular/core/testing';

import { CommandeMedicamentService } from './commande-medicament.service';

describe('CommandeMedicamentService', () => {
  let service: CommandeMedicamentService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CommandeMedicamentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
