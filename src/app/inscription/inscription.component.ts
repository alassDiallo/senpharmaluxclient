import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { validationTelephone } from 'src/models/config';
import { GetTokenService } from '../services/get-token.service';
import { InformationPersoService } from '../services/information-perso.service';
import { ServiceauthentificationService } from '../services/serviceauthentification.service';

@Component({
  selector: 'app-inscription',
  templateUrl: './inscription.component.html',
  styleUrls: ['./inscription.component.css']
})


export class InscriptionComponent implements OnInit {

  formGroup!: FormGroup;
  erreurTelephone: boolean = false
  erreurEmail: boolean = false
  submitErr: boolean = false
  constructor(private form: FormBuilder,
    private servicaut: ServiceauthentificationService,
    private servInfo: InformationPersoService,
    private serveToken: GetTokenService,
    private routes: Router) { }

  ngOnInit(): void {
    this.initForm();
    $('#champsTelephone').on('keypress', function (e) {
      if (e.keyCode < 48 || e.keyCode > 57) {
        return false;
      }
      return true;
    })

    //   $('#nom').on('keypress',function(e){
    //     console.log(e.keyCode);
    //     if(e.keyCode>=48 && e.keyCode<=57){
    //         return false;
    //     }
    // });
    // $('#prenom').on('keypress',function(e){
    //     console.log(e.keyCode);
    //     if(e.keyCode>=48 && e.keyCode<=57){
    //         return false;
    //     }
    // });
  }

  initForm() {
    this.formGroup = this.form.group({
      nom: ['', [Validators.required, Validators.maxLength(100)]],
      prenom: ['', [Validators.required, Validators.maxLength(100)]],
      adresse: ['', [Validators.required, Validators.maxLength(100)]],
      telephone: ['', [Validators.required,
      Validators.minLength(9),
      Validators.maxLength(12), validationTelephone]],
      email: ['', [Validators.required, Validators.email]],
      motDePasse: ['', [Validators.required, Validators.maxLength(20)]],
      configmotDePasse: ['', [Validators.required, Validators.maxLength(20),
      (c: AbstractControl): { [key: string]: boolean } | null => {
        if (c.value) {
          if (c.value !== this.formGroup.value['motDePasse']) {
            return { 'errorMp': true }
          }
        }
        return null
      }]],

    })
  }

  get f() { return this.formGroup.controls; }

  submit() {
    this.submitErr = true

    if (this.formGroup.valid) {
      this.submitErr = false
      const nom = this.formGroup.value['nom']
      const prenom = this.formGroup.value['prenom']
      const adresse = this.formGroup.value['adresse']
      const telephone = this.formGroup.value['telephone']
      const email = this.formGroup.value['email']
      const motDePasse = this.formGroup.value['motDePasse']
      const donnees = {
        nom: nom,
        email: email,
        prenom: prenom,
        adresse: adresse,
        telephone: telephone,
        motDePasse: motDePasse,
        profil: "client"
      }
      this.servicaut.inscription(donnees).then((user: any) => {
        if (user.err) {
          if (user.errorTelephone) {
            this.erreurTelephone = true
          }
          else {
            this.erreurTelephone = false

          }
          if (user.errorEmail) {
            this.erreurEmail = true
          }
          else {
            this.erreurEmail = false
          }
          return

        } else {

          this.servInfo.addUser(user)
          this.serveToken.addToken()
          this.routes.navigate(['/'])

        }
      })
        .catch(err => {
          console.log(err)
        })
    }
  }

}
