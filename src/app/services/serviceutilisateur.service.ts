import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { config, headers, nom } from 'src/models/config';
import { ModifierMotDePasseComponent } from '../profil/modifier-mot-de-passe/modifier-mot-de-passe.component';
import { EnvoieService } from './envoie.service';

@Injectable({
  providedIn: 'root'
})
export class ServiceutilisateurService {

  subutilisateur = new Subject<any[]>()
  utilisateurs!: any[]

  constructor(private http: HttpClient, private bd: EnvoieService) { }

  emitUtilisateurs() {
    this.subutilisateur.next(this.utilisateurs.slice())
  }

  getUtilisateurs() {
    this.bd.recuperer(`vendeur`).subscribe(
      (allVendeur) => {
        this.utilisateurs = allVendeur;
        this.emitUtilisateurs();
      }
    )
  }

  getUser() {
    const email = nom().email
    return new Promise((resolv, reject) => this.bd.recuperer('utilisateur/' + email).subscribe(data => {
      resolv(data)

    },
      (err) => {
        reject(err)
      }
    ))

  }


  addUser(vendeur: any) {
    return new Promise(
      (resolve, reject) => {
        this.bd.envoi(`vendeur`, vendeur).subscribe(
          (v) => {
            resolve(v);
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
            resolve(response)
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
            resolve(response);
          },
          (error) => {
            reject(error)
          }
        )
      }
    )
  }
  modifierMp(donnees: any) {
    const email = nom().email
    return new Promise((resolv, reject) => {

      this.bd.envoi('auth/modifierMp/' + email, donnees).subscribe(d => {
        resolv(d)

      }, (err) => {
        reject(err)
      })
    })
  }
}
