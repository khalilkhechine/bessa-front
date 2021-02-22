import { Injectable } from '@angular/core';
import { io } from 'socket.io-client';
import {AuthenticationService} from './auth/authentication.service';
import {Subject} from 'rxjs';

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
  notification = [];
  incomingNotification = new Subject();
  constructor(private authService: AuthenticationService) {
    this.socket.on('notification', (data) => {
      this.notification.push(data);
      this.incomingNotification.next(this.notification);
    });
  }
}
