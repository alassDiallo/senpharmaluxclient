import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ServiceutilisateurService } from 'src/app/services/serviceutilisateur.service';

@Component({
  selector: 'app-modifier-mot-de-passe',
  templateUrl: './modifier-mot-de-passe.component.html',
  styleUrls: ['./modifier-mot-de-passe.component.css']
})
export class ModifierMotDePasseComponent implements OnInit {

  formG!: FormGroup;
  erreurPassword: boolean = false


  constructor(private routes: Router,
    private formB: FormBuilder,
    private serveU: ServiceutilisateurService) { }

  ngOnInit(): void {

    this.initForm()
  }

  initForm() {

    this.formG = this.formB.group({
      motDePasse: ['', [Validators.required]],
      newmotDePasse: ['', [Validators.required]],
      confmotDePasse: ['', [Validators.required, Validators.maxLength(20),
      (c: AbstractControl): { [key: string]: boolean } | null => {
        if (c.value) {
          if (c.value !== this.formG.value['newmotDePasse']) {
            return { 'errorMp': true }
          }
        }
        return null
      }]],

    })
  }

  modifier() {

    const donnees = {
      motDePasse: this.formG.value['motDePasse'],
      newmotDePasse: this.formG.value['newmotDePasse'],
      confmotDePasse: this.formG.value['confmotDePasse'],

    }

    this.serveU.modifierMp(donnees).then((reponse: any) => {
      if (reponse.error) {
        this.erreurPassword = true
      }
      else {
        this.erreurPassword = false
        this.formG.reset()
      }
    })

  }

}
