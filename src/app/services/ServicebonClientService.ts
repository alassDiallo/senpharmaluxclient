import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { BonClient } from 'src/models/BonClient.models';
import { config, headers, nom } from 'src/models/config';
import { EnvoieService } from './envoie.service';

@Injectable({
  providedIn: 'root'
})
export class ServicebonClientService {

  bonClient!: any[];
  bonClientsubject = new Subject<any[]>()

  constructor(private http: HttpClient, private bd: EnvoieService) { }

  emitbonClient() {
    this.bonClientsubject.next(this.bonClient.slice())
  }

  getbonClient() {
    this.bd.recuperer(`bonclient`).subscribe(
      (allBonclient) => {
        this.bonClient = allBonclient;
        this.emitbonClient()
      },
      (error) => {
        console.log(error)
      }
    )
    this.emitbonClient();
  }


  getSingleBonClient(id: number) {
    return new Promise(
      (resolve, reject) => {
        this.bd.recuperer(`bonclient/` + id).subscribe(
          (bonclDetail) => {

            resolve(bonclDetail)

          },
          (error) => {

            resolve(error)
          }

        )
      }
    )

  }

  ajoutbonClient(bonClient: any) {

    return new Promise((resolve, reject) => {
      this.bd.envoi(`bonClient`, bonClient).subscribe(bonClient => {

        resolve(bonClient)
      }, (error) => {

        reject(error)
      })
    })

  }

  modifyBonclient(id: number, bon: any) {
    return new Promise(
      (resolve, reject) => {
        this.bd.modifier(`client/` + id, bon).subscribe(
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

  crediter(solde: any) {

    console.log(solde);
  }

  debiter(solde: any) {

    console.log(solde);
  }

  mescommandes() {
    const email = nom().email
    return new Promise((resolve, reject) => {
      this.bd.recuperer(`commandeClient/mescommandes/${email}`)
        .subscribe((commande) => {
          resolve(commande)
        }, (err) => {
          reject(err)
        })
    })
  }

  mesachats() {
    const email = nom().email
    return new Promise((resolve, reject) => {
      this.bd.recuperer(`commandeClient/mesachats/${email}`)
        .subscribe((commande) => {
          resolve(commande)
        }, (err) => {
          reject(err)
        })
    })
  }
}