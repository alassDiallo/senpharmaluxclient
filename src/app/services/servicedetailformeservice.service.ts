import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { config, headers } from 'src/models/config';
import { EnvoieService } from './envoie.service';

@Injectable({
  providedIn: 'root'
})
export class ServicedetailformeserviceService {

  subMedicamentByForme = new Subject<any[]>()
  medicamentByForm!: any[]

  constructor(private http: HttpClient, private bd: EnvoieService) { }

  getAllMedicamentByForme(id: number) {
    return new Promise(
      (resolve, rejects) => {
        this.bd.recuperer(`formes/` + id).subscribe(
          (all_medoc_by_form: any) => {
            resolve(all_medoc_by_form)
          },
          (err) => {

            rejects(err)

          }
        )
      }
    )
  }


}
