import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Route, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClientmiddlewareService implements CanActivate {

  constructor(private route: Router) { }

  getRole() {
    if (localStorage.getItem('roleuser') !== null && localStorage.getItem('roleuser') === "client") {

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
