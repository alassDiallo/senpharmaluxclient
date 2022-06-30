import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { nom } from 'src/models/config';
import { GetTokenService } from './get-token.service';

@Injectable({
  providedIn: 'root'
})
export class InformationPersoService {

  utilisateur: any
  subinfo = new Subject<any>()

  constructor(private servitoken: GetTokenService) { }

  emit() {
    this.subinfo.next(this.utilisateur)
  }

  getInfo() {
    this.utilisateur = nom()
    this.emit()
  }

  addUser(user: any) {
    const utilisateur = {
      nom: user.utilisateur.prenom + " " + user.utilisateur.nom,
      email: user.utilisateur.email,
      telephone: user.utilisateur.telephone,
      adresse: user.utilisateur.adresse

    }
    const roleuser = user.utilisateur.profil
    localStorage.setItem('807605274673228623802113__luxdev-access-token', user.token)
    localStorage.setItem('user', JSON.stringify(utilisateur))
    localStorage.setItem('roleuser', JSON.stringify(roleuser))
    this.getInfo()

  }


}
