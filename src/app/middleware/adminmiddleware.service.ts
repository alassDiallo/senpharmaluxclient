import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminmiddlewareService {

  constructor(private route: Router) { }
  getRole() {
    if (localStorage.getItem('roleuser') !== null && localStorage.getItem('roleuser') === "admin") {

      return true
    }

    return false

  }

  canActivate(route: ActivatedRouteSnapshot, status: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    if (this.getRole()) {
      return true
    }
    return this.route.navigate(['/connexion'])

  }
}
