import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { ServiceauthentificationService } from '../services/serviceauthentification.service';

@Injectable({
  providedIn: 'root'
})
export class AuthmiddlewareService implements CanActivate {
  isAuth!: boolean;
  serviceAuth !: Subscription
  constructor(private serviceAuthentification: ServiceauthentificationService, private route: Router) {
  }
  getToken() {
    if (localStorage.getItem('807605274673228623802113__luxdev-access-token') !== null) {

      return true
    }

    return false

  }

  canActivate(route: ActivatedRouteSnapshot, status: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    if (this.getToken()) {
      return true
    }
    return this.route.navigate(['/connexion'])

  }
}
