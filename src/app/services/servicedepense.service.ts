import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { config, headers } from 'src/models/config';
import { depenseTtpe } from 'src/models/stock';
import { depenseM } from 'src/models/vente';
import { EnvoieService } from './envoie.service';

@Injectable({
  providedIn: 'root'
})
export class ServicedepenseService {

  subDepense = new Subject<any[]>();
  depenses!: any[];


  constructor(private http: HttpClient, private bd: EnvoieService) { }

  emitDepenses() {
    this.subDepense.next(this.depenses.slice())
  }
  getDepenseAnnuelle() {
    return this.bd.recuperer(`depense/depenses`)
  }
  getDepenseMensuelle() {
    return this.http.get<depenseM[]>(`${config.apiUrl}/depense/depensemensuelle`, {
      headers: headers
    })
  }

  getDepenseMoisCourant() {
    return this.http.get<depenseM[]>(`${config.apiUrl}/depense/depensMoisCourant`, {
      headers: headers
    })
  }
  getDepenseParType() {
    return this.http.get<depenseTtpe[]>(`${config.apiUrl}/depense/depenseType`, {
      headers: headers
    })
  }
  getAllDepenses() {
    this.bd.recuperer(`depense`).subscribe(
      (allDepense) => {
        this.depenses = allDepense;
        this.emitDepenses();
      },
      (err) => {
        console.log(err)
      }
    )
  }
  addDepense(depense: any) {
    return new Promise(
      (resolve, reject) => {
        this.bd.envoi(`depense`, depense).subscribe(
          (dep) => {
            resolve(dep)
          },
          (error) => {
            reject(error)
          }
        )
      }
    )
  }

  modifyDepense(id: number, depense: any) {
    return new Promise(
      (resolve, reject) => {
        this.bd.modifier(`depense/` + id, depense).subscribe(
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

  deleteDepense(id: number) {
    return new Promise(
      (resolve, reject) => {
        this.bd.supprimer(`depense/` + id).subscribe(
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
}
