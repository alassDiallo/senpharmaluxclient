import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { config, headers } from 'src/models/config';
import { EnvoieService } from './envoie.service';

@Injectable({
  providedIn: 'root'
})
export class ServicerayonService {


  rayon!: any[];
  rayonsubject = new Subject<any[]>()

  constructor(private http: HttpClient, private bd: EnvoieService) { }

  emitrayon() {
    this.rayonsubject.next(this.rayon.slice())
  }

  getrayon() {
    this.bd.recuperer(`rayon`).subscribe(
      (allrayon: any) => {
        this.rayon = allrayon;
        this.emitrayon();
      },
      (err) => {
        console.log(err);
      }
    )
  }

  getOneRayon(id: number) {
    return new Promise(
      (resolve, reject) => {
        this.bd.recuperer(`rayon/` + id).subscribe(
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

  ajoutrayon(rayon: any) {
    return new Promise(
      (resolve, reject) => {
        this.bd.envoi(`rayon`, rayon).subscribe(
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
  modifyRayon(id: number, rayon: any) {
    return new Promise(
      (resolve, reject) => {
        this.bd.modifier(`rayon/` + id, rayon).subscribe(
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

  deleteRayon(id: number) {
    return new Promise(
      (resolve, reject) => {
        this.bd.supprimer(`rayon/` + id).subscribe(
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

  getRayonById(id: number) {
    return this.rayon[id - 1];
  }
}
