import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { etat } from 'src/models/Collaboration';
import { config, headers } from 'src/models/config';
import { EnvoieService } from './envoie.service';

@Injectable({
  providedIn: 'root'
})
export class ServiceCollaborationService {

  subCollaboration = new Subject<any[]>();
  collaboration!: any[];
  collabaration1!: any[]
  constructor(private http: HttpClient, private bd: EnvoieService) { }

  getNombreCollaborateur() {

    return this.bd.recuperer(`entreprise/nombre`)
  }
  emitCollaboration() {
    this.subCollaboration.next(this.collaboration.slice());
  }

  getAllColaboration() {
    this.bd.recuperer(`entreprise`).subscribe(
      (allCollaborations) => {
        this.collaboration = allCollaborations;
        this.emitCollaboration();
      },
      (error) => {
        console.log(error);
      }
    )
  }

  addCollaboration(collaboration: any) {
    return new Promise(
      (resolve, reject) => {
        this.bd.envoi(`entreprise`, collaboration).subscribe(
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

  modifyCollaboration(id: number, collaboration: any) {
    return new Promise(
      (resolve, reject) => {
        this.bd.modifier(`entreprise/` + id, collaboration).subscribe(
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

  deleteCollaboration(id: number) {
    return new Promise(
      (resolve, reject) => {
        this.bd.supprimer('entreprise/' + id).subscribe(
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

  getCollaborationDetail(id: number) {
    return new Promise((resolve, reject) => {
      this.bd.recuperer(`entreprise/` + id).subscribe((medicament => {
        resolve(medicament)
      }),
        (error) => {
          reject(error)
        })
    })
  }
  getEtatCollaboration(id: number) {
    return this.bd.recuperer(`remboursement/r/` + id)
  }
  getPaiementCollaboration(id: number) {
    return this.bd.recuperer(`remboursement/p/` + id)
  }
  getTotalPaiement(id: number) {
    return this.bd.recuperer(`remboursement/t/` + id)
  }

  getHistoriquePaiementCollaboration(id: number) {
    return new Promise((resolve, reject) => {
      this.bd.recuperer(`remboursement/h/` + id).subscribe((medicament => {
        resolve(medicament)
      }),
        (error) => {
          reject(error)
        })
    })

  }
}
