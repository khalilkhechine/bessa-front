import { Component, OnInit, ElementRef } from '@angular/core';
import { ROUTES } from '../sidebar/sidebar.component';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import {AuthenticationService} from '../../services/auth/authentication.service';
import {SocketIOService} from '../../services/socket-ioservice.service';
import {Notification} from '../../models/notification.model';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  public focus;
  public listTitles: any[];
  public location: Location;
  notifications: Notification[] = [];
  constructor(
    location: Location,
    private element: ElementRef,
    private router: Router,
    private authenticationService: AuthenticationService,
    private socketIOService: SocketIOService
  ) {
    this.location = location;
    this.socketIOService.incomingNotification.subscribe((value: Notification[]) => {
      this.notifications = value;
    });
  }

  ngOnInit() {
    this.listTitles = ROUTES.filter(listTitle => listTitle);
  }
  getTitle() {
    let title = this.location.prepareExternalUrl(this.location.path());
    if (title.charAt(0) === '#') {
        title = title.slice( 1 );
    }

    for (let item = 0; item < this.listTitles.length; item++) {
        if (this.listTitles[item].path === title) {
            return this.listTitles[item].title;
        }
    }
    return 'Dashboard';
  }

  logout() {
    this.authenticationService.logout();
  }

  sendReadNotification(event: boolean) {
    if (!event) {
      this.socketIOService.sendReadNotification(this.notifications);
    }
  }
}
