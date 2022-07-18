import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ServiceauthentificationService } from '../services/serviceauthentification.service';

@Component({
  selector: 'app-mot-de-passe-oublie',
  templateUrl: './mot-de-passe-oublie.component.html',
  styleUrls: ['./mot-de-passe-oublie.component.css']
})
export class MotDePasseOublieComponent implements OnInit {
  formG!: FormGroup
  serviceAuth!: Subscription
  errorEmailInvalid: boolean = false
  testeEmail: boolean = false

  constructor(private serviceauth: ServiceauthentificationService,
    private formB: FormBuilder, private route: Router) { }

  ngOnInit(): void {
    $('#EmailEnvoye').modal('hide')
    this.initForm()
  }

  initForm() {
    this.formG = this.formB.group({
      email: ['', [Validators.required, Validators.email]]
    })
  }

  submit() {
    const email = this.formG.value['email']
    this.serviceauth.modifierMp(email)
      .then((reponse: any) => {
        if (reponse.error) {
          this.errorEmailInvalid = true
        }
        else {
          this.errorEmailInvalid = false
          $('#EmailEnvoye').modal('show')
          setTimeout(() => {
            $('#EmailEnvoye').modal('hide')
            this.route.navigate(['/'])
          }, 2000)
          this.testeEmail = true
        }
      })
  }

}
