import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { config, headers } from 'src/models/config';
import { EnvoieService } from './envoie.service';

@Injectable({
  providedIn: 'root'
})
export class ServicedetailcommandeService {

  subDetailsCommandeMeodcs = new Subject<any[]>()
  detailsCommandeMedocs!: any[]

  constructor(private http: HttpClient, private bd: EnvoieService) { }

  getDetailsCommandeMedocsByFournisseur(id: number) {
    return new Promise(
      (resolve, rejects) => {
        this.bd.recuperer(`fournisseurs/` + id).subscribe(
          (detailsCom: any) => {
            this.detailsCommandeMedocs = detailsCom;

            resolve(detailsCom)
          },
          (err) => {

            rejects(err)
          }
        )
      }
    )
  }

  // // getDetailsCommandeFourniseeurByDate(id: number, date: string) {
  // //   return new Promise(
  // //     (resolve, rejects) => {
  // //       this.http.get(`${config.apiUrl}/fournisseurs/` + id + '/' + date, {headers: headers}).subscribe(
  // //         (resultat: any) => {

  // //         }
  // //       )
  // //     }
  // //   )
  // }



}
