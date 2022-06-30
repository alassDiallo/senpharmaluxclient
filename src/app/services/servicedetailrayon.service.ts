import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { config, headers } from 'src/models/config';
import { EnvoieService } from './envoie.service';

@Injectable({
  providedIn: 'root'
})
export class ServicedetailrayonService {

  subMedicamentByRayon = new Subject<any[]>();
  medicamentByRayon: any[] = [];

  constructor(private http: HttpClient, private bd: EnvoieService) { }

  emitMedicamentByRayon() {
    this.subMedicamentByRayon.next(this.medicamentByRayon.slice())
  }
  getAllMedicamentByRayon(id: number) {
    return new Promise(
      (resolve, reject) => {
        this.bd.recuperer(`rayon/` + id).subscribe(
          (a: any) => {

            this.medicamentByRayon = a
            resolve(a)
            // this.emitMedicamentByRayon()
          },
          (err) => {

            reject(err)
          }
        )
      }
    )
  }

  operationMedicamentAuRayon(m: any, quantite: number, rayonId: number, action: string) {
    const data = {
      'rayonId': rayonId,
      'medicamentId': m.id,
      'quantite_a_Etage': m.Etage.quantite,
      'quantite': quantite,
      'numero': m.Etage.numero
    }
    return new Promise(
      (resolve, reject) => {
        this.bd.envoi(`etage/ajouter-quantite-a-etage/` + m.Etage.id, data).subscribe(
          (response) => {

            resolve(response)
          },
          (err) => {

            reject(err)
          }
        )

      }
    );
  }



  removeMedicamentAuRayon(m: any, quantite: number, rayonId: number, action: string) {
    const data = {
      'rayonId': rayonId,
      'medicamentId': m.id,
      'quantite_a_Etage': m.Etage.quantite,
      'quantite': quantite,
      'numero': m.Etage.numero
    }
    return new Promise(
      (resolve, reject) => {
        this.bd.envoi(`etage/retirer-quantite-a-etage/` + m.Etage.id, data).subscribe(
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

  retirerMedicamentAuRayon(m: any, rayonId: number) {
    const data = {
      'rayonId': rayonId,
      'medicamentId': m.id,
      'quantite_a_Etage': m.Etage.quantite,
      'numero': m.Etage.numero
    }

    return new Promise(
      (resolve, reject) => {
        this.bd.envoi(`etage/retirer-medoc-de-etage/` + m.Etage.id, data).subscribe(
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
