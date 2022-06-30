import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { config, headers } from 'src/models/config';
import { inventaire, medocsPerimes, remboursement, venteEffectue } from 'src/models/vente';

@Injectable({
  providedIn: 'root'
})
export class InventaireService {

  constructor(private http: HttpClient) { }

  getNombreNouveauClient() {
    return this.http.get(`${config.apiUrl}/client/i`, {
      headers: headers
    })
  }

  getRembourseentDuMois() {
    return this.http.get<any[]>(`${config.apiUrl}/remboursement/i`, {
      headers: headers
    })
  }

  getRembourseentParSociete() {
    return this.http.get<any[]>(`${config.apiUrl}/entreprise/i`, {
      headers: headers
    })
  }
  getDetteParSociete() {
    return this.http.get<any[]>(`${config.apiUrl}/entreprise/id`, {
      headers: headers
    })
  }

  getVentes() {
    return this.http.get<venteEffectue[]>(`${config.apiUrl}/ligneVente/i`, {
      headers: headers
    })
  }
  getVentesAnnuelles() {
    return this.http.get<venteEffectue[]>(`${config.apiUrl}/ligneVente/va`, {
      headers: headers
    })
  }


  getDepensesInventaire() {
    return this.http.get<inventaire[]>(`${config.apiUrl}/depense/i`, {
      headers: headers
    })
  }

  getMedocsPerimesInventaire() {
    return this.http.get<medocsPerimes[]>(`${config.apiUrl}/medicamentPerime/i`, {
      headers: headers
    })
  }
  getMedocsDefectueuxInventaire() {
    return this.http.get<medocsPerimes[]>(`${config.apiUrl}/medicamentsDefectueux/i`, {
      headers: headers
    })
  }

  getMedicamentsDeffectueuxPeriode(debut: any, fin:any){
    return this.http.get<medocsPerimes[]>(`${config.apiUrl}/medicamentsDefectueux/`+debut+'/'+fin, {
      headers: headers
    })
  }

  getMedocsPerimesInventairePeriode(debut:any, fin:any) {
    return this.http.get<medocsPerimes[]>(`${config.apiUrl}/medicamentPerime/`+debut+'/'+fin, {
      headers: headers
    })
  }

  getVentesperiode(debut:any, fin:any) {
    return this.http.get<venteEffectue[]>(`${config.apiUrl}/ligneVente/`+debut+'/'+fin, {
      headers: headers
    })
  }

  getRembourseentPeriode(debut:any, fin:any) {
    return this.http.get<any[]>(`${config.apiUrl}/entreprise/`+debut+'/'+fin, {
      headers: headers
    })
  }

  
  getDepensesInventairePeriode(debut:any, fin:any) {
    return this.http.get<inventaire[]>(`${config.apiUrl}/depense/`+debut+'/'+fin, {
      headers: headers
    })
  }

  getDepenseTotalPeriode(debut:any, fin:any) {
    return this.http.get<inventaire[]>(`${config.apiUrl}/depense/p/`+debut+'/'+fin, {
      headers: headers
    })
  }

  getRembourseentParSocietePeriode(debut:any, fin:any) {
    return this.http.get<any[]>(`${config.apiUrl}/entreprise/r/`+debut+'/'+fin, {
      headers: headers
    })
  }

  getDetteParSocietePeriode(debut:any, fin:any) {
    return this.http.get<any[]>(`${config.apiUrl}/entreprise/d/`+debut+'/'+fin, {
      headers: headers
    })
  }


  getTes(debut:any, fin:any) {
    return this.http.get<any[]>(`${config.apiUrl}/remboursement/`+debut+'/'+fin, {
      headers: headers
    })
  }
}
