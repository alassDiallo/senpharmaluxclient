import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs/internal/Subscription';
import { NotificationService } from 'src/app/services/notification.service';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.css']
})
export class NotificationsComponent implements OnInit {

  notifications!: any[];
  subNotifications!: Subscription;

  constructor(private http: HttpClient,
    private route: Router,
    private servicenotification: NotificationService) { }

  ngOnInit(): void {
    this.getNotifications()
  }

  today!: Date
  getNotifications() {
    this.subNotifications = this.servicenotification.subNotificaitons.subscribe(
      (all_notifs: any[]) => {
        this.notifications = all_notifs
      }
    )
    this.servicenotification.getNotifications()
    this.today = new Date()

  }
}
