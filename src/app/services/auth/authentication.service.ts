import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {User} from '../../models/user.model';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {map} from 'rxjs/operators';
import jwt_decode from 'jwt-decode';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(private http: HttpClient, private router: Router) {
  }

  get jwtToken(): string {
    return localStorage.getItem('token');
  }

  public get decryptedUser(): User {
    return jwt_decode(this.jwtToken);
  }

  set jwtToken(token: string) {
    localStorage.clear();
    localStorage.setItem('token', token);
  }

  login(username: string, password: string) {
    return this.http.post<any>(`${environment.apiUrl}${environment.authUrl}/login`, { username, password })
    .pipe(map(token => {
      // store user details and jwt token in local storage to keep user logged in between page refreshes
      this.jwtToken = token;
      return this.decryptedUser;
    }));
  }

  logout() {
    localStorage.removeItem('currentUser');
    this.router.navigate(['/login']);
  }
}
