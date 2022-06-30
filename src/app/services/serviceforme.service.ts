import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { config, headers, nom } from 'src/models/config';
import { EnvoieService } from './envoie.service';

@Injectable({
  providedIn: 'root'
})
export class ServiceformeService {

  subforme = new Subject<any[]>()
  formes!: any[]

  constructor(private http: HttpClient, private bd: EnvoieService) { }

  emitForme() {
    this.subforme.next(this.formes.slice())
  }

  getFormes() {
    const donnee = {
      useremail: nom().email
    }
    this.bd.recuperer(`formes`).subscribe(formes => {
      this.formes = formes
      this.emitForme()
    },
      err => {
        console.log(err)
      })
  }

  addForme(forme: any) {

    return new Promise((resolve, reject) => {
      this.bd.envoi("formes", forme).subscribe(message => {
        resolve(message)
        this.getFormes()
      },
        err => {
          reject(err)
        })
    })

  }

  deleteForme(id: number) {
    this.bd.supprimer(`formes/${id}`)
      .subscribe(() => {
        this.getFormes()
      })
  }

  modifier(forme: any, id: number) {
    return new Promise((resolve, reject) => {

      this.bd.modifier("formes/" + id, forme)
        .subscribe(forme => {

          resolve(forme)
        }, (error) => {

          reject(error)
        })
    })
  }

}
