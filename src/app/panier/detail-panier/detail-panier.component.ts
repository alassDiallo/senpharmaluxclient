import { Component, Input, OnInit } from '@angular/core';
import { PanierService } from 'src/app/services/panier.service';

@Component({
  selector: 'app-detail-panier',
  templateUrl: './detail-panier.component.html',
  styleUrls: ['./detail-panier.component.css']
})
export class DetailPanierComponent implements OnInit {

  @Input() medicament: any
  constructor(private servicepanier: PanierService) { }

  ngOnInit(): void {

  }

  augmenter() {
    this.medicament.quantite = parseInt(this.medicament.quantite) + 1
  }
  diminuer() {
    this.medicament.quantite = parseInt(this.medicament.quantite) - 1
  }

  supprimer(m: any) {
    this.servicepanier.supprimer(m);
  }

}
