import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { config } from 'src/models/config';
import { PanierService } from '../services/panier.service';
import { ServicemedicamentService } from '../services/servicemedicament.service';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent implements OnInit {

  config: string = config.apiUrl
  ajout: boolean = false
  subMedoc !: Subscription
  formG!: FormGroup
  medicament!: any
  medicaments!: any
  quantite: any;
  taille!: any

  constructor(private route: ActivatedRoute,
    private servicemed: ServicemedicamentService,
    private panierService: PanierService, private formB: FormBuilder) { }

  ngOnInit(): void {
    this.formG = this.formB.group({ quantite: [1, [Validators.required, Validators.min(1)]] })
    this.getMedicament()


  }

  getMedicament() {
    const libelle = this.route.snapshot.params['id'];
    this.servicemed.getMedicamentDetailMedoc(libelle).then((med: any) => {

      this.medicament = med.medicament
      this.medicaments = med.medicaments
      this.taille = Array.from(Array(med.medicament.Stocks[0].quantiteStock).keys())
      if (this.taille > 0) {
        this.quantite = 1
      }

    })
      .catch(err => {
        console.log(err)
      })

  }

  ajoutPanier(m: any) {
    const quantite = this.formG.value['quantite'];
    const medicament = {
      medicamentId: m.id,
      libelle: m.libelle,
      image: m.image,
      quantite: quantite,
      prix: m.prixPublic
    }

    this.panierService.addPanier(medicament)
    this.ajout = true
    setTimeout(() => {
      this.ajout = false
    }, 3000)
  }

}
