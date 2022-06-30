import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { config, headers } from 'src/models/config';
import { EnvoieService } from './envoie.service';

@Injectable({
  providedIn: 'root'
})
export class ServicedetailcommandeFournisseurService {

  subDetailsComForunisseur = new Subject<any[]>()
  detailsComForunisseur!: any[]


  constructor(private http: HttpClient, private bd: EnvoieService) { }

  emitDetailsComFournisseur() {
    this.subDetailsComForunisseur.next(this.detailsComForunisseur.slice())
  }

  getDetailsComFournisseurByOneDate(id: number, date: Date) {
    this.bd.recuperer(`fournisseurs/` + id + '/' + date).subscribe(
      (resultat) => {
        this.detailsComForunisseur = resultat
        this.emitDetailsComFournisseur()
      },
      (err) => {

        console.log(err)
      })
  }

}
