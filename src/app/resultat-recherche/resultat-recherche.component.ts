import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { ServicemedicamentService } from '../services/servicemedicament.service';

@Component({
  selector: 'app-resultat-recherche',
  templateUrl: './resultat-recherche.component.html',
  styleUrls: ['./resultat-recherche.component.css']
})
export class ResultatRechercheComponent implements OnInit {

  subscrip!: Subscription;
  recherche!: String
  isSearching: boolean = false
  compteur: number = 0
  medocs: any[] = []
  constructor(private route: ActivatedRoute, private servmed: ServicemedicamentService) { }

  ngOnInit(): void {
    setInterval(() => {
      if (this.compteur < 100) {
        this.compteur += 20
      }

    }, 1000)
    this.getMedicament()

  }

  getMedicament() {
    this.isSearching = true
    this.route.queryParams.subscribe(params => {
      this.recherche = params.q
    })

    setTimeout(() => {
      this.isSearching = false
      this.subscrip = this.servmed.medocsubject.subscribe((med: any[]) => {
        this.medocs = med.filter(m => m.libelle.toLowerCase().indexOf(this.recherche.toLocaleLowerCase()) > -1 ||
          m.Forme.libelle.toLowerCase().indexOf(this.recherche.toLocaleLowerCase()) > -1 ||
          m.Categorie.libelle.toLowerCase().indexOf(this.recherche.toLocaleLowerCase()) > -1 ||
          m.CodeGeographique.libelle.toLowerCase().indexOf(this.recherche.toLocaleLowerCase()) > -1)
      })
      this.servmed.getMedicament()

    }, 5000)


  }

}
