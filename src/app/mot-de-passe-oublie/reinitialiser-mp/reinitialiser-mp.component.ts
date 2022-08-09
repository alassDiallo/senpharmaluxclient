import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { EnvoieService } from 'src/app/services/envoie.service';

@Component({
  selector: 'app-reinitialiser-mp',
  templateUrl: './reinitialiser-mp.component.html',
  styleUrls: ['./reinitialiser-mp.component.css']
})
export class ReinitialiserMpComponent implements OnInit {
  formG!: FormGroup
  email!: String

  constructor(private formB: FormBuilder, private bd: EnvoieService,
    private route: ActivatedRoute, private navigation: Router) {
    const token = this.route.snapshot.params['token']
    this.bd.recuperer('auth/verifToken/' + token).subscribe((response: any) => {
      if (response.error) {
        this.navigation.navigate(['not-found'])
      }
      else {
        this.email = response.email
      }

    }, error => {
      this.navigation.navigate(['/not-found'])
      console.log(error)
    })

  }

  ngOnInit(): void {
    this.formG = this.formB.group({
      motDePasse: ['', [Validators.required]],
      confmotDePasse: ['', [Validators.required, (c: AbstractControl): { [key: string]: boolean } | null => {
        if (c.value) {
          if (c.value !== this.formG.value['motDePasse']) {
            return { 'errorMp': true }
          }
        }
        return null
      }]]
    })
  }

  submit() {

    if (this.formG.valid) {
      alert('soumi')
      const donnees = {
        email: this.email,
        motDePasse: this.formG.value['motDePasse'],
      }
      this.bd.envoi('auth/reinitialiserMp', donnees).subscribe((data: any) => {
        if (!data.error) {
          return this.navigation.navigate(['/connexion'])
        }
        return

      })

    }

  }

}
