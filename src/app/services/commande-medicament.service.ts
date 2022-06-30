import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { config, headers } from 'src/models/config';
import { EnvoieService } from './envoie.service';

@Injectable({
  providedIn: 'root'
})
export class CommandeMedicamentService {

  lots!: any[];
  lotsubject = new Subject<any[]>()

  constructor(private http: HttpClient, private bd: EnvoieService) { }

  emitcommande() {
    this.lotsubject.next(this.lots.slice())
  }
  getLot() {
    this.bd.recuperer(`commandeMedicamentD`).subscribe(lots => {
      this.lots = lots
      this.emitcommande()

    },
      err => {
        console.log(err)
      })
  }

}

