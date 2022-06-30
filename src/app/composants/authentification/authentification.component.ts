import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ServiceauthentificationService } from 'src/app/services/serviceauthentification.service';
import { headers } from 'src/models/config';

@Component({
  selector: 'app-authentification',
  templateUrl: './authentification.component.html',
  styleUrls: ['./authentification.component.css']
})
export class AuthentificationComponent implements OnInit {

  isAuth: boolean = false
  isLoading: boolean = false

  formGroup!: FormGroup

  constructor(private form: FormBuilder, private routes: Router, private serviceauth: ServiceauthentificationService) {

  }

  ngOnInit(): void {
    this.initForm()
  }

  initForm() {
    this.formGroup = this.form.group({
      login: ['', [Validators.required, Validators.email]],
      motDePasse: ['', [Validators.required]]
    })

  }

  submit() {
    this.isLoading = true;
    const login = this.formGroup.value['login']
    const mp = this.formGroup.value['motDePasse']
    setTimeout(() => {

      this.serviceauth.connexion(login, mp).then((user: any) => {
        if (user.err) {
          this.isAuth = true
          this.isLoading = false;
          return
        }

        this.isAuth = false
        this.isLoading = false;
        const utilisateur = {
          nom: user.utilisateur.prenom + " " + user.utilisateur.nom,
          email: user.utilisateur.email,
          telephone: user.utilisateur.telephone,
          adresse: user.utilisateur.adresse

        }
        const roleuser = user.utilisateur.profil
        localStorage.setItem('807605274673228623802113__luxdev-access-token', user.token)
        localStorage.setItem('user', JSON.stringify(utilisateur))
        this.routes.navigate(['/'])
        return
      })
        .catch(err => {
          console.log(err)
        })
    }, 2000)
  }

}
