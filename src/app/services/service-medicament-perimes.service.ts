import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { config, headers } from 'src/models/config';
import { EnvoieService } from './envoie.service';
import { UrlconnexionService } from './urlconnexion.service';


@Injectable({
  providedIn: 'root'
})
export class ServiceMedicamentPerimesService {

  medicamentPerime!: any[]
  medocsubject = new Subject<any[]>()

  constructor(private http: HttpClient, private urlcon: UrlconnexionService, private bd: EnvoieService) {

  }

  emitMedoc() {
    this.medocsubject.next(this.medicamentPerime.slice())
  }

  getMedicament() {
    this.bd.recuperer(`medicamentPerime`)
      .subscribe(medicamentPerime => {
        this.medicamentPerime = medicamentPerime
        this.emitMedoc()
      },
        (error) => {
          return error
        }
      )


  }

  ajoutMedicament(medicament: any) {

    return new Promise((resolve, reject) => {
      this.bd.envoi(`medicamentPerime`, medicament).subscribe(medicament => {

        resolve(medicament)

      }, (error) => {

        reject(error)
      })
    })


  }

  modifierMedicament(medicament: any) {

    return new Promise((resolve, reject) => {
      this.bd.envoi(`medicamentPerime`, medicament).subscribe(medicament => {

        resolve(medicament)

      }, (error) => {

        reject(error)
      })
    })




  }

  getMedicamentDetail(id: string) {
    const ids = id.split('-').join(" ")

    return new Promise((resolve, reject) => {
      this.bd.recuperer(`medicamentPerime/` + ids).subscribe((medicament => {
        resolve(medicament)
      }),
        error => {
          reject(error)
        })
    })
  }

  ajoutLot(lot: any) {
    const medicament = this.medicamentPerime.find((m) => {
      return m.libelle === lot.libelle
    });
    medicament.quantite = medicament.quantite + lot.quantite

    this.bd.modifier(`medicamentPerime`, medicament).subscribe(medicament => {

    }, (error) => {

      reject(error)
    })

    this.emitMedoc()
  }
}
function reject(error: any) {
  throw new Error('Function not implemented.');
}

