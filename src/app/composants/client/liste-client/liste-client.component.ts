import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ServiceclientService } from 'src/app/services/serviceclient.service';
import { validationTelephone } from 'src/models/config';

@Component({
  selector: 'app-liste-client',
  templateUrl: './liste-client.component.html',
  styleUrls: ['./liste-client.component.css']
})
export class ListeClientComponent implements OnInit {

  errorTelephone = false
  errorEmail = false
  formGroup!: FormGroup;
  clients: any[] = [];
  dtOptions: DataTables.Settings = {};
  subsclient!: Subscription
  isModify!: boolean;
  clientId!: number;
  recherche!: any
  totalLength!: number
  page: number = 1
  cls: any[] = [];
  tailles = [5, 10, 25, 100]
  taille = 5;
  submitErr: boolean = false
  constructor(private routes: Router, private serviceclient: ServiceclientService, private form: FormBuilder) { }

  ngOnInit(): void {

    this.recherche = new FormControl('')
    this.initForm()
    this.getclient()
    this.isModify = false;
    $('#champsTelephone').on('keypress', function (e) {
      if (e.keyCode < 48 || e.keyCode > 57) {
        return false;
      }
      return true;
    })
  }

  initForm() {
    this.formGroup = this.form.group({
      nom: ['', [Validators.required]],
      prenom: ['', [Validators.required]],
      telephone: ['', [Validators.required, validationTelephone]],
      adresse: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      // motDePass: ['', [Validators.required]],
    })
  }

  afficherButtonSave() {
    this.isModify = false;
  }

  submit() {
    this.submitErr = true
    if (this.formGroup.valid) {
      this.submitErr = false
      const nom = this.formGroup.value['nom']
      const prenom = this.formGroup.value['prenom']
      const adresse = this.formGroup.value['adresse']
      const telephone = this.formGroup.value['telephone']
      const email = this.formGroup.value['email']
      const profil = "client"
      const motDePasse = "luxdev"
      // const motDePass = this.formGroup.value['motDePass']

      const client = {
        nom: nom,
        prenom: prenom,
        adresse: adresse,
        telephone: telephone,
        email: email,
        profil: profil,
        motDePasse: motDePasse
        //motDePass: motDePass
      }
      if (!this.isModify) {
        this.serviceclient.addclient(client).then(
          (message: any) => {
            if (message.errorTelephone || message.errorEmail) {
              if (message.errorTelephone) {
                this.errorTelephone = true
              } else {
                this.errorTelephone = false
              }
              if (message.errorEmail) {
                this.errorEmail = true
              } else {
                this.errorEmail = false
              }

            }
            else {
              this.errorEmail = false
              this.errorTelephone = false
              this.formGroup.reset();
              this.isModify = false;
              $('#exampleModal').modal('hide');
              this.getclient();
            }

          },
        )

      } else if (this.isModify) {

        this.serviceclient.modifyClient(this.clientId, client).then(
          (message: any) => {
            if (message.errorTelephone || message.errorEmail) {
              if (message.errorTelephone) {
                this.errorTelephone = true
              } else {
                this.errorTelephone = true
              }
              if (message.errorEmail) {
                this.errorEmail = true
              } else {
                this.errorEmail = true
              }

            }
            else {
              this.formGroup.reset();
              this.isModify = false;
              $('#exampleModal').modal('hide');
              this.getclient();
            }

          },
          (error) => {
            console.log(error)
          }
        )
      }
    }
  }

  modifier(client: any) {
    this.clientId = client.id;
    this.isModify = true;
    this.formGroup.patchValue({
      nom: client.nom,
      prenom: client.prenom,
      email: client.email,
      telephone: client.telephone,
      adresse: client.adresse
    });
    $('#exampleModal').modal('show')
  }

  supprimer(client: any) {
    this.serviceclient.deleteClient(client.id).then(
      () => {
        this.getclient();
      },
      (error) => {
        console.log('Erreur de suppression')
      }
    )
    // return confirm("Voulez-vous vraiment ssupprimé ce client")
  }

  afficherDetail(c: any) {
    this.routes.navigate(['/espace/clients/' + c.id]);
  }

  getclient() {
    this.subsclient = this.serviceclient.subclient.subscribe(
      (allClient: any[]) => {
        this.clients = allClient
        this.cls = allClient
        this.totalLength = allClient.length
      });
    this.serviceclient.getclients();
  }

  changerPage(event: number) {
    this.page = event
  }

  changerTaille(event: any) {
    this.taille = event.target.value
    this.page = 1
  }

  changer() {
    this.page = 1
    return this.cls = this.clients.filter(
      cl =>
        cl.prenom.toLowerCase().indexOf(this.recherche.value.toLowerCase()) > -1
        || cl.nom.toLowerCase().indexOf(this.recherche.value.toLowerCase()) > -1
        || cl.adresse.toLowerCase().indexOf(this.recherche.value.toLowerCase()) > -1
        || cl.email.toLowerCase().indexOf(this.recherche.value.toLowerCase()) > -1
        || cl.telephone.indexOf(this.recherche.value.toLowerCase()) > -1)

  }


}
