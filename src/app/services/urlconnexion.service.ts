import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UrlconnexionService {

  urlcon: string = "http://localhost:3000/"

  constructor() { }
}
