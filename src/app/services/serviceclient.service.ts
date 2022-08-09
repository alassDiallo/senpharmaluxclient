import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { config, headers, nom } from 'src/models/config';
import { EnvoieService } from './envoie.service';

@Injectable({
  providedIn: 'root'
})
export class ServiceclientService {

  subclient = new Subject<any[]>()
  subclientDetails = new Subject<any>();
  clients!: any[]
  client_details!: any[]

  constructor(private http: HttpClient, private bd: EnvoieService) { }
  getNombreClient() {
    return this.http.get(`${config.apiUrl}/client/nombre`, {
      headers: headers
    })
  }

  emitclients() {
    this.subclient.next(this.clients.slice())
  }
  emitclientDetails() {
    this.subclientDetails.next(this.client_details.slice())
  }

  getclients() {
    this.bd.recuperer(`client`).subscribe(
      (allClient) => {
        this.clients = allClient;
        this.emitclients()
      },
      (error) => {
        console.log(error)
      }
    )
  }

  addclient(client: any) {
    return new Promise(
      (resolve, reject) => {
        this.bd.envoi(`auth/signup`, client).subscribe(
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

  getDetailClient(id: number) {
    return new Promise(
      (resolve, reject) => {
        this.bd.recuperer(`client/` + id).subscribe(
          (clientDetail) => {

            resolve(clientDetail)

          },
          (error) => {

            resolve(error)
          }

        )
      }
    )

  }

  modifyClient(id: number, client: any) {
    return new Promise(
      (resolve, reject) => {
        this.bd.modifier(`${config.apiUrl}/client/` + id, client).subscribe(
          (response) => {
            resolve(response);
          },
          (error) => {

            reject(error);
          }
        )
      }
    )
  }

  modifierProfil(client: any) {
    const email = nom().email
    return new Promise(
      (resolve, reject) => {
        this.bd.modifier(`auth/modifierProfil/` + email, client).subscribe(
          (response) => {
            resolve(response);
          },
          (error) => {
            reject(error);
          }
        )
      }
    )
  }

  modifierDetailClient(client: any) {
    const email = nom().email
    return new Promise(
      (resolve, reject) => {
        this.bd.modifier(`client/modifierinfo/` + email, client).subscribe(
          (response) => {
            resolve(response);
          },
          (error) => {

            reject(error);
          }
        )
      }
    )
  }
  deleteClient(id: number) {
    return new Promise(
      (resolve, reject) => {
        this.bd.supprimer(`${config.apiUrl}/client/` + id).subscribe(
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
