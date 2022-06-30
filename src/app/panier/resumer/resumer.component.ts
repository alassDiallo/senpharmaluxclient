import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { EnvoieService } from 'src/app/services/envoie.service';
import { PanierService } from 'src/app/services/panier.service';
import { TypepaiementService } from 'src/app/services/typepaiement.service';
import { nom } from 'src/models/config';

@Component({
  selector: 'app-resumer',
  templateUrl: './resumer.component.html',
  styleUrls: ['./resumer.component.css']
})
export class ResumerComponent implements OnInit {

  subPanier!: Subscription
  medicaments: any[] = []
  total: number = 0
  types!: any[]
  formG!: FormGroup
  info!: any
  subtypepayement!: Subscription
  typepaiement: any
  constructor(private panierService: PanierService,
    private typep: TypepaiementService,
    private formB: FormBuilder,
    private bd: EnvoieService,
    private route: Router) { }

  ngOnInit(): void {
    this.info = nom()
    this.formG = this.formB.group({ typepaiement: ['', Validators.required] })
    // this.typepaiement = new FormControl(['', Validators.required])
    this.subPanier = this.panierService.subpanier.subscribe(m => {
      this.medicaments = m
      m.map(m => this.total += m.prix * m.quantite)
    })
    this.panierService.getPanier()
    this.getTypePaiement()

  }

  getTypePaiement() {
    this.subtypepayement = this.typep.subtypepayement.subscribe(type => {
      this.types = type
    })
    this.typep.getTypePaiement()
  }

  valider() {

    const v = {
      cout: this.total,
      typePayementId: this.formG.value['typepaiement'],
      emailClient: this.info.email,
      medicaments: this.medicaments

    };

    this.panierService.valider(v)
      .then((message: any) => {
        if (!message.error) {
          this.panierService.supprimerPanier()
          this.bd.envoi('send-notification', { 'data': 'Une nouvelle commande client' })
          this.route.navigate(['/'])

        }

      })
  }


}
