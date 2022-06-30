import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { EnvoieService } from './envoie.service';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  subNotificaitons = new Subject<any[]>()
  notifications!: any[]


  newNotifs!: number

  constructor(private http: HttpClient, private bd: EnvoieService) { }

  emitNotifications() {
    this.subNotificaitons.next(this.notifications.slice())
  }



  getNotifications() {
    this.bd.recuperer(`notifications`).subscribe(
      (notifs) => {
        this.notifications = notifs
        this.emitNotifications()
      },
      (err) => {
        console.log(err)
      }
    )
  }
  getNewNotifications() {
    return new Promise(
      (resolve, rejects) => {
        this.bd.recuperer(`notifications/new`).subscribe(
          (n) => {
            this.notifications = n
            resolve(n)
            this.emitNotifications()
          },
          (err) => {
            rejects(err)
          }
        )
      }
    )

  }

  getNotificationClient(email: string) {
    this.bd.envoi(`notifications/client`, { email: email }).subscribe(
      (nottifs_client: any) => {
        this.notifications = nottifs_client
        this.emitNotifications()
      },
      (err) => {
        console.log(err)
      }

    )
  }

  sendNotificationVisited(email: string) {
    this.bd.modifier(`notifications/client/visited`, { email: email }).subscribe(
      (nottifs_client: any) => {
        this.notifications = nottifs_client

      },
      (err) => {
        console.log(err)
      }

    )
  }
}
