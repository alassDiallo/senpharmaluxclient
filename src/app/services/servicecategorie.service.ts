import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { categorieMedicament } from 'src/models/categorie';
import { config, headers } from 'src/models/config';
import { EnvoieService } from './envoie.service';

@Injectable({
  providedIn: 'root'
})
export class ServicecategorieService {

  categorie!: any[];
  categoriesubject = new Subject<any[]>()

  constructor(private http: HttpClient, private bd: EnvoieService) { }

  emitCategorie() {
    this.categoriesubject.next(this.categorie.slice())
  }
  getNombreMedocsCategorie(): Observable<categorieMedicament[]> {
    return this.http.get<categorieMedicament[]>(`${config.apiUrl}/categories/medicament_categorie`, {
      headers: headers
    })
  }
  getCategorie() {

    this.bd.recuperer(`categories`).subscribe(categories => {
      this.categorie = categories
      this.emitCategorie();
    },
      err => {

        console.log(err)
      })

  }

  ajoutCategorie(categorie: any) {
    return new Promise((resolve, reject) => {
      this.bd.envoi(`categories`, categorie).subscribe(message => {
        resolve(message)
        this.getCategorie()
      },
        err => {
          reject(err)
        })
    })

  }

  supprimerCategorie(idC: number) {
    const id = idC
    this.bd.supprimer(`categories/${id}`).subscribe(() => {
      this.getCategorie()
    },
      err => {
        console.log('err')
      })

  }

  modifier(categorie: any, id: number) {
    return new Promise((resolve, reject) => {
      this.bd.modifier("categories/" + id, categorie)
        .subscribe(categorie => {

          resolve(categorie)
        }, (error) => {

          reject(error)
        })
    })

  }

}
