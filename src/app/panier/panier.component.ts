import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { PanierService } from '../services/panier.service';

@Component({
  selector: 'app-panier',
  templateUrl: './panier.component.html',
  styleUrls: ['./panier.component.css']
})
export class PanierComponent implements OnInit {

  subPanier!: Subscription
  medicaments: any[] = []
  total: number = 0
  constructor(private panierService: PanierService) { }

  ngOnInit(): void {

    this.subPanier = this.panierService.subpanier.subscribe(m => {
      this.medicaments = m
      this.total = 0;
      m.map((m: any) => this.total += m.prix * m.quantite)
    })


    this.panierService.getPanier()
    // const panier = localStorage.getItem('panier')
    // if (panier != null) {

    //   this.medicaments = JSON.parse(panier);
    // }
  }

}
