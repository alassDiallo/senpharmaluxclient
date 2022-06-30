import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { config, headers } from 'src/models/config';
import { EnvoieService } from './envoie.service';

@Injectable({
  providedIn: 'root'
})
export class ServicecommandeService {


  commande!: any[];
  commandesClient !: any[]
  commandesubject = new Subject<any[]>()
  commandeClientSuject = new Subject<any[]>()

  constructor(private http: HttpClient, private bd: EnvoieService) { }



  emitcommande() {
    this.commandesubject.next(this.commande.slice())
  }

  emitcommandeClient() {
    this.commandeClientSuject.next(this.commandesClient.slice())
  }
  getNombreCommande() {
    return this.bd.recuperer(`commandeClient/nombre`)
  }


  getcommande() {

    this.bd.recuperer(`commandeClient`).subscribe(commandes => {
      this.commandesClient = commandes
      this.emitcommandeClient()
    },
      err => {
        return err
      }
    )


  }

  validerCommande(id: number) {
    return new Promise((resolv, reject) => {
      this.bd.recuperer(`commandeClient/valider/${id}`).subscribe(message => {
        resolv(message)
        this.getcommande()
      },
        err => {
          return reject(err)
        }
      )
    })

  }

  ajoutcommande(commande: any) {
    this.commande.push(commande)
    this.emitcommande()

  }




  getcommandeMedocForFournisseur() {
    this.bd.recuperer(`commandeMedicamentD`)
      .subscribe(mesCommande => {
        this.commande = mesCommande
        this.emitcommande()
      },
        (error) => {
          return error
        }
      )

  }
}