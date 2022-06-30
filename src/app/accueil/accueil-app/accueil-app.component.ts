import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ServicecategorieService } from 'src/app/services/servicecategorie.service';
import { ServicemedicamentService } from 'src/app/services/servicemedicament.service';
import { config, headers } from 'src/models/config';

@Component({
  selector: 'app-accueil-app',
  templateUrl: './accueil-app.component.html',
  styleUrls: ['./accueil-app.component.css']
})
export class AccueilAppComponent implements OnInit {

  config: string = config.apiUrl
  medicaments!: any[]
  categories!: any[]
  totalLength!: number
  page: number = 1
  submed!: Subscription
  subCat!: Subscription
  constructor(private http: HttpClient, private servicemed: ServicemedicamentService, private servicecat: ServicecategorieService) { }

  ngOnInit(): void {

    this.getMedicament()
    this.getCategorie()

  }

  getMedicament() {
    this.servicemed.medocsubject.subscribe((medicaments: any[]) => {
      this.medicaments = medicaments
      this.totalLength = medicaments.length
    })
    this.servicemed.getMedicament()
  }

  getCategorie() {
    this.servicecat.categoriesubject.subscribe((categories: any[]) => {
      this.categories = categories
    })
    this.servicecat.getCategorie()
  }

  changerPage(event: number) {
    this.page = event
  }
  ngDestroy(): void {
    this.subCat.unsubscribe()
    this.submed.unsubscribe()
  }


}
