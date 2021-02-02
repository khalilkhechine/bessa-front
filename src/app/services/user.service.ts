import { Injectable } from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {User} from '../models/user.model';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private authApiUrl = environment.apiUrl + environment.authUrl;
  private userApiUrl = environment.apiUrl + environment.userUrl;

  constructor(private httpClient: HttpClient) { }

  register(user: User): Observable<User> {
    return this.httpClient.post<User>(`${this.authApiUrl}/register`, user);
  }
}
