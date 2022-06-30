import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { config, headers } from 'src/models/config';
import { depenseM, historique, vendeur, vendeuri } from 'src/models/vente';
import { EnvoieService } from './envoie.service';

export interface Vendeur {
  id: number;
  nom: string
  prenom: string
  adresse: string
  email: string
  telephone: string
  profil: string
}
@Injectable({
  providedIn: 'root'
})

export class ServicevendeurService {
  subvendeur = new Subject<any[]>()
  vendeurs!: any[]
  v: vendeur[] = []
  constructor(private http: HttpClient, private bd: EnvoieService) { }

  emitvendeurs() {
    this.subvendeur.next(this.vendeurs.slice())
  }

  getvendeurs() {
    this.bd.recuperer(`vendeur`).subscribe(
      (allVendeur) => {
        this.vendeurs = allVendeur;
        this.emitvendeurs()
      }
    )
  }
  getvendeurR() {
    this.http.get<vendeur[]>(`${config.apiUrl}/vendeur/vendeurRealisation`, {
      headers: headers
    }).subscribe((vente) => this.v = vente)
  }
  addvendeur(vendeur: any) {
    return new Promise(
      (resolve, reject) => {
        this.bd.envoi(`auth/signup`, vendeur).subscribe(
          (response) => {

            resolve(response);
          },
          (error) => {

            reject(error);
          }
        )
      }
    )
  }

  modifyVendeur(id: number, vendeur: any) {
    return new Promise(
      (resolve, reject) => {
        this.bd.modifier(`vendeur/` + id, vendeur).subscribe(
          (response) => {

            resolve(response);
          },
          (error) => {

            reject(error)
          }
        )
      }
    )
  }

  deleteVendeur(id: number) {
    return new Promise(
      (resolve, reject) => {
        this.bd.supprimer(`vendeur/` + id).subscribe(
          (response) => {

            resolve(response)
          },
          (error) => {

            reject(error);
          }
        )
      }
    )
  }

  getDetailVendeur(id: number) {
    return new Promise((resolve, reject) => {
      this.bd.recuperer(`vendeur/` + id).subscribe((medicament => {
        resolve(medicament)
      }),
        (error) => {
          reject(error)
        })
    })
  }



  getVendeurVenteAnnuelle(id: number) {
    return new Promise((resolve, reject) => {
      this.http.get<vendeuri[]>(`${config.apiUrl}/ventesimples/a/` + id, {
        headers: headers
      }).subscribe((medicament => {
        resolve(medicament)
      }),
        (error) => {
          reject(error)
        })
    })
  }

  getVendeurVenteMensuelle(id: number) {
    return this.http.get<depenseM[]>(`${config.apiUrl}/ventesimples/vendeurv/` + id, {
      headers: headers
    })
  }

  getOneVendeurVenteMensuelle(id: number) {
    return this.http.get<vendeuri[]>(`${config.apiUrl}/ventesimples/m/` + id, {
      headers: headers
    })
  }
  getOneVendeurVenteAnnuelle(id: number) {
    return this.http.get<vendeuri[]>(`${config.apiUrl}/ventesimples/a/` + id, {
      headers: headers
    })
  }

  getOneVendeurHistoriqueVenteAnnuelle(id: number) {
    return new Promise((resolve, reject) => {
      this.bd.recuperer(`ventesimples/h/` + id).subscribe((medicament => {
        resolve(medicament)
      }),
        (error) => {
          reject(error)
        })
    })

  }
}
