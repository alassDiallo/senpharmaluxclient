import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { config, headers } from 'src/models/config';
import { EnvoieService } from './envoie.service';
import { UrlconnexionService } from './urlconnexion.service';

@Injectable({
  providedIn: 'root'
})
export class CodegeographiqueService {

  subcode = new Subject<any[]>();
  codes!: any[]

  constructor(private http: HttpClient, private urlcon: UrlconnexionService, private bd: EnvoieService) { }

  emitCode() {
    this.subcode.next(this.codes.slice())
  }

  getCode() {
    this.bd.recuperer(`codegeographiques`).subscribe(codes => {
      this.codes = codes
      this.emitCode()

    },
      err => {
        console.log(err)
      })
  }

  addCode(code: any) {

    return new Promise((resolve, reject) => {
      this.bd.envoi(`codegeographiques`, code).subscribe((reponse) => {
        resolve(reponse)
        this.getCode()
      },
        err => {
          reject(err)
        })
    })
  }

  getOneCode(id: String) {

    return new Promise((resolve, reject) => {
      this.bd.recuperer(`codegeographiques/` + id).subscribe(code => {
        resolve(code)
        this.getCode()
      },
        err => {
          reject(err)
        })
    })

  }

  deleteCode(id: number) {
    return new Promise((resolve, reject) => {
      this.bd.supprimer(`codegeographiques/` + id).subscribe(code => {
        resolve(code)
        this.getCode()
      },
        err => {
          reject(err)
        })
    })
  }

  modifier(code: any, id: number) {
    return new Promise((resolve, reject) => {
      this.bd.modifier("codegeographiques/" + id, code)
        .subscribe(code => {
          console.log(code);
          resolve(code)
        }, (error) => {
          console.log(code)
          reject(error)
        })
    })
  }
}
