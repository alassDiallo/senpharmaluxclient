import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { config, headers } from 'src/models/config';
import { EnvoieService } from './envoie.service';
import { UrlconnexionService } from './urlconnexion.service';


@Injectable({
  providedIn: 'root'
})
export class ServiceMedicamentDeffectueuxService {

  medicamentsDefectueux!: any[]
  medocsubject = new Subject<any[]>()

  constructor(private http: HttpClient, private urlcon: UrlconnexionService, private bd: EnvoieService) {

  }

  emitMedoc() {
    this.medocsubject.next(this.medicamentsDefectueux.slice())
  }

  getMedicament() {
    this.bd.recuperer(`medicamentsDefectueux`)
      .subscribe(medicamentsDefectueux => {
        this.medicamentsDefectueux = medicamentsDefectueux
        this.emitMedoc()
      },
        (error) => {
          return error
        }
      )
    // this.emitMedoc()

  }

  ajoutMedicament(medicament: any) {

    return new Promise((resolve, reject) => {
      this.bd.envoi(`medicamentsDefectueux`, medicament
      ).subscribe(medicament => {

        resolve(medicament)
      }, (error) => {

        reject(error)
      })
    })
    // this.medicamentsDefectueux.push(medicament)


  }

  getMedicamentDetail(id: string) {
    const ids = id.split('-').join(" ")

    return new Promise((resolve, reject) => {
      this.bd.recuperer(`medicamentsDefectueux/` + ids).subscribe((medicament => {
        resolve(medicament)
      }),
        error => {
          reject(error)
        })
    })
  }

  ajoutLot(lot: any) {
    const medicament = this.medicamentsDefectueux.find((m) => {
      return m.libelle === lot.libelle
    });
    medicament.quantite = medicament.quantite + lot.quantite

    this.emitMedoc()
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

}
