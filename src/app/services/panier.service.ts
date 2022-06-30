import { Injectable } from '@angular/core';

import { Subject } from 'rxjs';
import { EnvoieService } from './envoie.service';

@Injectable({
  providedIn: 'root'
})
export class PanierService {

  panier: any[] = []
  total: number = 0
  subpanier = new Subject<any[]>()

  constructor(private bd: EnvoieService) { }


  emitPanier() {
    this.subpanier.next(this.panier.slice())
  }
  getPanier() {
    const p = localStorage.getItem('panier')
    if (p != null) {
      this.panier = JSON.parse(p)
    }
    else {
      this.panier = []
    }
    this.emitPanier()
  }

  addPanier(m: any) {
    const monpanier = localStorage.getItem('panier')
    if (monpanier == null) {
      const panier = []
      panier.push(m)
      localStorage.setItem('panier', JSON.stringify(panier));

    }
    else {
      const panier = JSON.parse(monpanier)
      const r = panier.find((element: any) => element.medicamentId == m.medicamentId)

      if (!r) {
        panier.push(m)
        localStorage.setItem('panier', JSON.stringify(panier));
      }
    }
    this.getPanier()
  }

  supprimer(m: any) {

    const monpanier = localStorage.getItem('panier')
    if (monpanier != null) {
      const panier = JSON.parse(monpanier).filter((p: any) => p.medicamentId != m.medicamentId)
      localStorage.setItem('panier', JSON.stringify(panier));
      this.getPanier()

    }
  }

  valider(v: any) {
    const tab = JSON.stringify(v)
    return new Promise((resolv, reject) => {
      this.bd.envoi('ventesimples/passercommande', { 'tab': tab }).subscribe(message => {
        resolv(message)
      },
        err => {
          reject(err)
        })
    })
  }

  supprimerPanier() {
    localStorage.removeItem('panier')
    this.getPanier()
  }

}
