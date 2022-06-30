import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ServicebonClientService } from 'src/app/services/ServicebonClientService';

@Component({
  selector: 'app-mescommande',
  templateUrl: './mescommande.component.html',
  styleUrls: ['./mescommande.component.css']
})
export class MescommandeComponent implements OnInit {
  subscom!: Subscription
  mescommandes: any[] = []
  mesachats: any[] = []
  recherche!: any
  totalLength!: number
  page: number = 1
  totalLengthA!: number
  pageA: number = 1

  constructor(private servcom: ServicebonClientService) { }

  ngOnInit(): void {

    this.servcom.mescommandes().then((mescommand: any) => {
      this.mescommandes = mescommand.filter((element: any) => element.etat == false)
      this.mesachats = mescommand.filter((element: any) => element.etat == true)
      this.totalLength = mescommand.filter((element: any) => element.etat == false).length
      this.totalLengthA = mescommand.filter((element: any) => element.etat == true).length

    })
  }

  changerPage(event: number) {
    this.page = event
  }
  changerPageA(event: number) {
    this.pageA = event
  }

}
