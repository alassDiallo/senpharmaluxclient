import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { config, headers } from 'src/models/config';
import { EnvoieService } from './envoie.service';

@Injectable({
  providedIn: 'root'
})
export class ServicedetailcategorieService {

  subMedicamentBycategorie = new Subject<any[]>();
  medicamentBycategorie!: any[]

  constructor(private http: HttpClient, private bd: EnvoieService) { }

  emitMedicamentBycategorie() {
    this.subMedicamentBycategorie.next(this.medicamentBycategorie.slice())
  }

  getAllMedicamnentByCategorie(id: string) {

    return new Promise((resolv, reject) => {
      this.bd.recuperer(`categories/` + id).subscribe(
        (all_medo_by_cat) => {
          resolv(all_medo_by_cat)
        },
        (err) => {

          reject(err)
        }
      )
    })

  }
}
