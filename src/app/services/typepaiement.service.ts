import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { config, headers } from 'src/models/config';
import { EnvoieService } from './envoie.service';

@Injectable({
  providedIn: 'root'
})
export class TypepaiementService {

  subtypepayement = new Subject<any[]>();
  types!: any[];

  constructor(private http: HttpClient, private bd: EnvoieService) { }

  emitPaiement() {
    this.subtypepayement.next(this.types.slice())
  }

  getTypePaiement() {
    this.bd.recuperer(`typepaiements`).subscribe((types) => {
      this.types = types
      this.emitPaiement()
    })
  }

  addTypePaiement(types: any) {
    return new Promise((resolve, reject) => {
      this.bd.envoi(`typepaiements/`, types).subscribe((types) => {
        resolve(types)
      },
        err => {
          reject(err)
        })
    })
  }

  modifier(types: any, id: number) {
    return new Promise((resolve, reject) => {
      this.bd.modifier(`typepaiements/` + id, types).subscribe((types) => {
        resolve(types)
      },
        err => {
          reject(err)
        })
    })
  }

  supprimer(id: number) {
    this.bd.supprimer(`typepaiements/` + id).subscribe((types) => {
      this.getTypePaiement()
    })
  }
}
