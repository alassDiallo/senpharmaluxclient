import { HttpClient } from '@angular/common/http';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { config, getRole, getToken, nom } from 'src/models/config';
import { seDeconnecter } from 'src/models/config';
import { NotificationService } from '../services/notification.service';
import { PanierService } from '../services/panier.service';
import { ServicecategorieService } from '../services/servicecategorie.service';
import { ServicemedicamentService } from '../services/servicemedicament.service';

import { io } from 'socket.io-client';
import { InformationPersoService } from '../services/information-perso.service';
import { EnvoieService } from '../services/envoie.service';
import { GetTokenService } from '../services/get-token.service';


@Component({
  selector: 'app-accueil-app',
  templateUrl: './accueil.component.html',
  styleUrls: ['./accueil.component.css']
})
export class AccueilComponentApp implements OnInit {

  private socket: any;
  public data: any;

  form!: FormGroup
  elementspanier!: any[]
  subpanier !: Subscription
  medicaments!: any[]
  isAuth: boolean = false;
  nom!: string
  email!: string
  categories!: any[]
  submed!: Subscription
  subCat!: Subscription

  subNotificationClient!: Subscription
  notificationClient!: any[]


  constructor(private http: HttpClient, private servicemed: ServicemedicamentService,
    private servicenotification: NotificationService,
    private bd: EnvoieService,
    private servinfo: InformationPersoService,
    private token: GetTokenService,
    private servicecat: ServicecategorieService, private route: Router, private servicePanier: PanierService, private formG: FormBuilder) {
    this.socket = io(config.apiUrl);
  }

  ngOnInit(): void {

    this.form = this.formG.group({
      recherche: ['']
    }
    )
    this.token.subToken.subscribe(token => {
      this.isAuth = token
    })
    this.token.getTken()
    this.getPanier()
    this.servinfo.subinfo.subscribe(info => {
      this.nom = info.nom
    })
    this.servinfo.getInfo()
    // this.getMedicament()
    // this.getCategorie()
    this.getNotificationClient()
    this.socket.on('notification', (data: any) => {
      this.data = data;
      this.nbr_notif_new = this.data.nbr
    });

  }
  nbr_notif_new = 0
  getNotificationClient() {
    this.subNotificationClient = this.servicenotification.subNotificaitons.subscribe(
      (notifs: any[]) => {
        this.notificationClient = notifs
        for (var i = 0; i < this.notificationClient.length; i++) {
          if (this.notificationClient[i].vu == false) {
            this.nbr_notif_new += 1
          }
        }
      }
    )
    this.servicenotification.getNotificationClient(nom().email)
  }

  async visitedNotification() {
    await this.servicenotification.sendNotificationVisited(nom().email)
    // await this.servicenotification.getNotificationClient(nom().email)
    this.nbr_notif_new = 0
  }

  // getLocalStorage() {
  //   const localstorage = localStorage.getItem("token")
  //   alert(localstorage)
  // }

  getMedicament() {

    this.servicemed.medocsubject.subscribe((medicaments: any[]) => {
      this.medicaments = medicaments
    })
    this.servicemed.getMedicament()
  }

  getPanier() {
    this.subpanier = this.servicePanier.subpanier.subscribe(m => {
      this.elementspanier = m
    })
    this.servicePanier.getPanier()
  }

  getCategorie() {
    this.servicecat.categoriesubject.subscribe((categories: any[]) => {
      this.categories = categories
    })
    this.servicecat.getCategorie()
  }

  deconnexion() {
    this.bd.recuperer(`auth/deconnexion`).subscribe((reponse: any) => {
      if (!reponse.err) {
        this.token.supprimerToken()
        // seDeconnecter()
        // this.isAuth = getToken()
        this.route.navigate(['/'])
      }
    })
  }

  recherche() {
    const r = this.form.value['recherche']
    this.route.navigate(['recherche'], { queryParams: { q: r } })
  }

  ngDestroy(): void {
    this.subCat.unsubscribe()
    this.submed.unsubscribe()
  }

}
