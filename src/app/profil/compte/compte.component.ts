import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { InformationPersoService } from 'src/app/services/information-perso.service';
import { ServiceclientService } from 'src/app/services/serviceclient.service';
import { ServiceutilisateurService } from 'src/app/services/serviceutilisateur.service';
import { nom } from 'src/models/config';

@Component({
  selector: 'app-compte',
  templateUrl: './compte.component.html',
  styleUrls: ['./compte.component.css']
})
export class CompteComponent implements OnInit {

  subutilisateur!: Subscription;
  errorEmail: boolean = false
  errorTelephone: boolean = false
  utilisateur: any
  info!: Subscription
  formGroup!: FormGroup
  serviceclient!: Subscription
  // subclient !: Subscription
  constructor(private subut: ServiceutilisateurService,
    private servinfo: InformationPersoService,
    private form: FormBuilder, private servclient: ServiceclientService) { }

  ngOnInit(): void {
    this.servinfo.subinfo.subscribe(data => {
      this.utilisateur = data
    })

    this.servinfo.getInfo()
    this.initForm()

  }

  initForm() {
    this.formGroup = this.form.group({
      nom: ['', [Validators.required]],
      prenom: ['', [Validators.required]],
      telephone: ['', [Validators.required]],
      adresse: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
    })
  }

  modifier() {
    this.formGroup.patchValue({
      nom: this.utilisateur.nom.split(' ')[1],
      prenom: this.utilisateur.nom.split(' ')[0],
      telephone: this.utilisateur.telephone,
      adresse: this.utilisateur.adresse,
      email: this.utilisateur.email
    })
    $('#exampleModal').modal('show')
  }

  submit() {
    const nom = this.formGroup.value['nom']
    const prenom = this.formGroup.value['prenom']
    const adresse = this.formGroup.value['adresse']
    const telephone = this.formGroup.value['telephone']
    const email = this.formGroup.value['email']


    const client = {
      nom: nom,
      prenom: prenom,
      adresse: adresse,
      telephone: telephone,
      email: email,

    }
    this.servclient.modifierProfil(client).then((reponse: any) => {
      if (reponse.error) {
        if (reponse.errorEmail) {
          this.errorEmail = true
        }
        else {
          this.errorEmail = false
        }
        if (reponse.errorTelephone) {
          this.errorTelephone = true
        }
        else {
          this.errorTelephone = false
        }
      }
      else {
        this.formGroup.reset();
        this.errorEmail = false
        this.errorTelephone = false
        $('#exampleModal').modal('hide')
        const utilisateur = {
          nom: prenom + " " + nom,
          email: email,
          telephone: telephone,
          adresse: adresse

        }
        localStorage.setItem('user', JSON.stringify(utilisateur))
        this.servinfo.getInfo()
      }
    })

    // this.routes.navigate(['espace/clients'])

  }

}
