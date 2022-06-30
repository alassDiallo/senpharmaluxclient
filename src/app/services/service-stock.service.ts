import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { config } from 'src/models/config';
import { niveauStock } from 'src/models/stock';

@Injectable({
  providedIn: 'root'
})
export class ServiceStockService {

  constructor(private http: HttpClient) { }
  getNiveauStockActuelle() {
    return this.http.get<niveauStock[]>(`${config.apiUrl}/stock/niveau`)
  }
}
