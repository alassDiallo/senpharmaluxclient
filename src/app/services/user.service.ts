import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/internal/Subject';
import { EnvoieService } from './envoie.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  subuser = new Subject<any[]>()
  users!: any[]

  constructor(private http: HttpClient, private bd: EnvoieService) { }

  emitUtilisateurs() {
    this.subuser.next(this.users.slice())
  }

  getUtilisateurs() {
    this.bd.recuperer(`utilisateurs`).subscribe(
      (all_user) => {
        this.users = all_user;
        this.emitUtilisateurs();
      }
    )
  }
}
