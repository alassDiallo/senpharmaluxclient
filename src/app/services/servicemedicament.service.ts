import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { config, headers } from 'src/models/config';
import { EnvoieService } from './envoie.service';
import { UrlconnexionService } from './urlconnexion.service';


@Injectable({
  providedIn: 'root'
})
export class ServicemedicamentService {

  medicaments!: any[]
  medocsubject = new Subject<any[]>()

  constructor(private http: HttpClient, private urlcon: UrlconnexionService, private bd: EnvoieService) {

  }

  emitMedoc() {
    this.medocsubject.next(this.medicaments.slice())
  }

  getMedicament() {
    this.bd.recuperer("medicaments")
      .subscribe(medicaments => {
        this.medicaments = medicaments
        this.emitMedoc()
      },
        (error) => {
          return error
        }
      )

  }
  getMedicamentVente() {
    return new Promise((resolve, reject) => {
      this.bd.recuperer("medicaments")
        .subscribe(medicaments => {
          resolve(medicaments)
        },
          (error) => {
            reject(error)
          }
        )
    })
  }

  ajoutMedicament(medicament: any) {



    return new Promise((resolve, reject) => {
      this.bd.envoi('medicaments', medicament)
        .subscribe(medicament => {

          resolve(medicament)
        }, (error) => {

          reject(error)
        })
    })



  }

  modifierMedicament(medicament: any, id: number) {
    return new Promise((resolve, reject) => {
      this.bd.modifier('medicaments/' + id, medicament)
        .subscribe(medicament => {

          resolve(medicament)
        }, (error) => {

          reject(error)
        })
    })
  }

  getMedicamentDetail(id: string) {

    const ids = id.split('-').join(" ")

    return new Promise((resolve, reject) => {
      this.bd.recuperer("medicaments/" + ids)
        .subscribe(medicament => {
          resolve(medicament)
        },
          error => {
            reject(error)
          })
    })
  }

  getMedicamentDetailMedoc(id: string) {
    const ids = id.split('-').join(" ")

    return new Promise((resolve, reject) => {
      this.bd.recuperer(`medicaments/detail/` + ids)
        .subscribe((medicament => {
          resolve(medicament)
        }),
          error => {
            reject(error)
          })
    })
  }

  ajoutLot(lot: any) {
    return new Promise((resolve, reject) => {
      this.http.post(`${config.apiUrl}/commandeMedicamentD/ajoutLot`, lot, {
        headers: headers
      }).subscribe(medicament => {

        resolve(medicament)
        this.emitMedoc()
      }, (error) => {
        reject(error)
      })
    })
  }
}
