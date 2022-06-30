import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { config, headers } from 'src/models/config';
import { depenseM, vendeur, venteAnnuelle } from 'src/models/vente';
import { EnvoieService } from './envoie.service';


@Injectable({
  providedIn: 'root'
})
export class ServiceventeService {

  subvente = new Subject<any[]>();
  ventes!: any[];

  constructor(private http: HttpClient, private bd: EnvoieService) { }

  emitVentes() {
    this.subvente.next(this.ventes.slice());
  }

  getVentes() {
    this.bd.recuperer(`ventesimples`).subscribe(ventes => {
      this.ventes = ventes
      this.emitVentes();
    }, err => {
      console.log(err)
    })
  }
  getVenteMensuelle() {
    return this.http.get<depenseM[]>(`${config.apiUrl}/ventesimples/vente_mensuelle`, {
      headers: headers
    })
  }
  getRemboursement() {
    return this.bd.recuperer(`remboursement/r`)
  }

  getVente(id: number) {
    return new Promise((resolve, reject) => {
      this.bd.recuperer(`ventesimples/` + id).subscribe(vente => {
        resolve(vente)
      }, err => {
        reject(err)
      })
    })
  }



  getTotalVente() {
    return this.http.get<venteAnnuelle[]>(`${config.apiUrl}/ventesimples/total`, {
      headers: headers
    })
  }
  getTotalVentePassser() {
    return this.http.get<venteAnnuelle[]>(`${config.apiUrl}/ventesimples/vp`, {
      headers: headers
    })
  }
  getVenteMoisCourant() {
    return this.http.get<venteAnnuelle[]>(`${config.apiUrl}/ventesimples/venteMoisCourant`, {
      headers: headers
    })
  }


  getTotalCommandeMensuelle() {
    return this.http.get<depenseM[]>(`${config.apiUrl}/ventesimples/nb_commande`, {
      headers: headers
    })
  }

  getVendeurRealisation() {
    return this.http.get<vendeur[]>(`${config.apiUrl}/vendeur/vendeurRealisation`, {
      headers: headers
    })
  }

  saveVente(v: any) {
    var tab = v

    return new Promise(
      (resolve, reject) => {
        this.http.post(`${config.apiUrl}/ventesimples`, { 'tab': tab }, { headers: headers }).subscribe(
          (response) => {
            resolve(response)
          },
          (err) => {
            reject(err)
          }
        )
      }
    )
  }

  supprimer(id: number) {
    this.bd.supprimer(`ventesimples/` + id).subscribe((message) => {
      this.getVentes()
    })
  }
}
