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

  totalLengthAchat!: number
  pageAchat: number = 1


  constructor(private servcom: ServicebonClientService) { }

  ngOnInit(): void {

    this.servcom.mescommandes().then((mescommand: any) => {
      this.mescommandes = mescommand
      this.totalLength = mescommand.length
      this.totalLengthA = mescommand.length

    })

    this.servcom.mesachats().then((mescommand: any) => {
      this.mesachats = mescommand
      this.totalLengthAchat = mescommand.length
    })
  }

  changerPage(event: number) {
    this.page = event
  }
  changerPageAchat(event: number) {
    this.pageAchat = event
  }

}
