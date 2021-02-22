import { Injectable } from '@angular/core';
import { io } from 'socket.io-client';
import {AuthenticationService} from './auth/authentication.service';
import {Subject} from 'rxjs';
import {Notification} from '../models/notification.model';

@Injectable({
  providedIn: 'root'
})
export class SocketIOService {
  socket = io('http://localhost:3000', {
    reconnectionDelayMax: 10000,
    auth: {
      user: this.authService.decryptedUser
    },
  });
  notifications = [];
  incomingNotification = new Subject();
  constructor(private authService: AuthenticationService) {
    this.socket.on('notification', (data) => {
      this.notifications.push(data);
      this.incomingNotification.next(this.notifications);
    });
  }

  sendReadNotification(notifications: Notification[]) {
    this.incomingNotification.next([]);
    this.socket.emit('readNotifications', notifications);
  }
}
