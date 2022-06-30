import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccueilComponentApp } from './accueil/accueil.component';
import { AppComponent } from './app.component';
import { AccueilComponent } from './composants/accueil/accueil.component';
import { AuthentificationComponent } from './composants/authentification/authentification.component';
import { NotFoundComponent } from './composants/not-found/not-found.component';
import { AuthmiddlewareService } from './middleware/authmiddleware.service';
import { PanierComponent } from './panier/panier.component';
import { ResumerComponent } from './panier/resumer/resumer.component';
import { NotificationsComponent } from './composants/notifications/notifications.component';
import { ClientmiddlewareService } from './middleware/clientmiddleware.service';
import { ResultatRechercheComponent } from './resultat-recherche/resultat-recherche.component';
import { MescommandeComponent } from './composants/client/mescommande/mescommande.component';
import { InscriptionComponent } from './inscription/inscription.component';
import { ProfilComponent } from './profil/profil.component';
import { ModifierMotDePasseComponent } from './profil/modifier-mot-de-passe/modifier-mot-de-passe.component';
import { CompteComponent } from './profil/compte/compte.component';
import { MotDePasseOublieComponent } from './mot-de-passe-oublie/mot-de-passe-oublie.component';
import { AccueilAppComponent } from './accueil/accueil-app/accueil-app.component';
import { DetailComponent } from './detail/detail.component';
const routes: Routes = [
  // { path: '', component: AppComponent },
  {
    path: '', component: AccueilComponentApp, children: [


      { path: 'inscription', component: InscriptionComponent },
      { path: 'mot-de-passe-oublie', component: MotDePasseOublieComponent },

      { path: 'detail/:id', component: DetailComponent },
      { path: '', component: AccueilAppComponent },
      { path: 'panier', component: PanierComponent },
      {
        path: 'mon-compte', canActivate: [AuthmiddlewareService], component: ProfilComponent, children: [
          { path: '', component: CompteComponent },
          { path: 'mescommandes', component: MescommandeComponent },
          { path: 'modifier-mp', component: ModifierMotDePasseComponent },
        ]
      },
      { path: 'panier/resumer-panier', canActivate: [AuthmiddlewareService], component: ResumerComponent },
      { path: 'recherche', component: ResultatRechercheComponent }
    ]
  },
  { path: 'mot-de-passe-oublie', component: MotDePasseOublieComponent },
  { path: 'not-found', component: NotFoundComponent },
  { path: 'connexion', component: AuthentificationComponent },
  { path: '**', redirectTo: 'not-found' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
