import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { config, headers } from 'src/models/config';
import { EnvoieService } from './envoie.service';

@Injectable({
  providedIn: 'root'
})
export class ServiceauthentificationService {

  isAuth: boolean = false
  subjauth = new Subject<boolean>()
  constructor(private routes: Router, private http: HttpClient, private bd: EnvoieService) { }

  connexion(login: string, mp: string) {
    return new Promise((resolve, reject) => {
      this.http.post(`${config.apiUrl}/auth/login/`, { email: login, motDePasse: mp }, {
        headers: headers
      }).subscribe((user) => {
        resolve(user)
      }, (error) => {

        reject(error)
      })
    })

  }

  inscription(donnees: any) {
    return new Promise(
      (resolve, reject) => {
        this.bd.envoi(`auth/signup`, donnees).subscribe(
          (response) => {

            resolve(response);
          },
          (error) => {

            reject(error)
          }
        )
      }
    )

  }

  getToken() {

    if (localStorage.getItem('token') !== null) {

      this.isAuth = true
    }
    else {
      this.isAuth = false
    }
  }

  modifierMp(email: String) {

    return new Promise((resolv, reject) => {
      this.bd.envoi('auth/modifiermotdepass', { email: email }).subscribe(reponse => {
        resolv(reponse)
      }, err => {
        reject(err)
      })


    })

  }
}

