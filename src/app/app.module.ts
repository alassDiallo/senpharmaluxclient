import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { registerLocaleData } from '@angular/common';
import { ChartModule } from 'angular2-chartjs';
import { LSelect2Module } from 'ngx-select2';
import { NgSelectModule } from '@ng-select/ng-select';
// import {MatSnackBarModule} from '@angular/material/snack-bar';

import * as fr from '@angular/common/locales/fr'
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AccueilComponent } from './composants/accueil/accueil.component';
import { NotFoundComponent } from './composants/not-found/not-found.component';
import { AuthentificationComponent } from './composants/authentification/authentification.component';
import { DataTablesModule } from 'angular-datatables';
import { NgxPaginationModule } from 'ngx-pagination';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ServiceauthentificationService } from './services/serviceauthentification.service';
import { HttpClientModule } from '@angular/common/http';
import { ServiceutilisateurService } from './services/serviceutilisateur.service';
import { AccueilComponentApp } from './accueil/accueil.component';
import { ServicemedicamentService } from './services/servicemedicament.service';
import { ServicecategorieService } from './services/servicecategorie.service';
import { ServicerayonService } from './services/servicerayon.service';
import { ServicecommandeService } from './services/servicecommande.service';
import { ServicebonClientService } from './services/ServicebonClientService';
import { DatePipe } from '@angular/common';
import { DetailComponent } from './detail/detail.component';
import { AccueilAppComponent } from './accueil/accueil-app/accueil-app.component';
import { ServiceCollaborationService } from './services/service-collaboration.service';
import { CodegeographiqueService } from './services/codegeographique.service';
import { NotifierModule } from 'angular-notifier';
import { PanierComponent } from './panier/panier.component';
import { DetailPanierComponent } from './panier/detail-panier/detail-panier.component';
//import { InventaireComponent } from './composants/inventaire/inventaire.component';

import { ResumerComponent } from './panier/resumer/resumer.component';
import { NotificationsComponent } from './composants/notifications/notifications.component';
import { ResultatRechercheComponent } from './resultat-recherche/resultat-recherche.component';
import { MescommandeComponent } from './composants/client/mescommande/mescommande.component';
import { MesachatsComponent } from './composants/client/mesachats/mesachats.component';
import { ProfilComponent } from './profil/profil.component';
import { InscriptionComponent } from './inscription/inscription.component';
import { CompteComponent } from './profil/compte/compte.component';
import { ModifierMotDePasseComponent } from './profil/modifier-mot-de-passe/modifier-mot-de-passe.component';
import { MotDePasseOublieComponent } from './mot-de-passe-oublie/mot-de-passe-oublie.component';
@NgModule({
  declarations: [
    AppComponent,
    AccueilComponentApp,
    NotFoundComponent,
    AuthentificationComponent,
    DetailComponent,
    AccueilAppComponent,
    PanierComponent,
    DetailPanierComponent,
    ResumerComponent,
    NotificationsComponent,
    ResultatRechercheComponent,
    MescommandeComponent,
    MesachatsComponent,
    ProfilComponent,
    InscriptionComponent,
    CompteComponent,
    ModifierMotDePasseComponent,
    MotDePasseOublieComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    DataTablesModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    NgxPaginationModule,
    ChartModule,
    LSelect2Module,
    NgSelectModule,
    NotifierModule.withConfig({}),
    // MatSnackBarModule
  ],
  providers: [
    { provide: LOCALE_ID, useValue: 'fr-FR' },
    ServiceauthentificationService,
    ServiceutilisateurService,
    ServicecategorieService,
    ServicerayonService,
    ServicebonClientService,
    ServicecommandeService,
    ServicemedicamentService,
    ServicebonClientService,
    ServicecategorieService,
    ServiceCollaborationService,
    CodegeographiqueService,
    DatePipe
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor() {
    registerLocaleData(fr.default)
  }
}
