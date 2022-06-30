import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { config, headers } from 'src/models/config';
import { EnvoieService } from './envoie.service';

@Injectable({
  providedIn: 'root'
})
export class ServicefournisseurService {

  subFournisseur = new Subject<any[]>();
  fournisseurs!: any[];

  constructor(private http: HttpClient, private bd: EnvoieService) { }

  emitFournisseurs() {
    this.subFournisseur.next(this.fournisseurs.slice());
  }

  getAllFournisseurs() {
    this.bd.recuperer(`fournisseurs`).subscribe(fournisseurs => {
      this.fournisseurs = fournisseurs
      this.emitFournisseurs()
    },
      err => {
        console.log(err)
      })

  }

  addFournisseur(fournisseur: any) {
    return new Promise((resolve, reject) => {
      this.bd.envoi(`fournisseurs`, fournisseur).subscribe(fournisseur => {
        resolve(fournisseur)
      },
        err => {
          reject(err)
        }
      )
    })
  }

  modifyFournisseur(id: number, fournisseur: any) {
    return new Promise(
      (resolve, reject) => {
        this.bd.modifier(`fournisseurs/` + id, fournisseur).subscribe(
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

  deleteClient(id: number) {
    return new Promise(
      (resolve, reject) => {
        this.bd.supprimer(`fournisseurs/` + id).subscribe(
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

  getNombreFournisseur() {
    return this.bd.recuperer(`fournisseurs/nombre`)
  }

  getNombreF() {
    return this.bd.recuperer(`fournisseurs/n`)
  }
}
