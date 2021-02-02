import { Injectable } from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Baby} from '../models/baby.model';
import {Count} from '../models/count.model';

@Injectable({
  providedIn: 'root'
})
export class BabyService {

  private apiUrl = environment.apiUrl + environment.babyUrl;

  constructor(private httpClient: HttpClient) { }

  getById(id): Observable<Baby> {
    return this.httpClient.get<Baby>(`${this.apiUrl}/${id}`);
  }

  delete(id): Observable<void> {
    return this.httpClient.delete<void>(`${this.apiUrl}/${id}`);
  }


  update(baby: Baby): Observable<Baby> {
    return this.httpClient.put<Baby>(`${this.apiUrl}/${baby._id}`, baby);
  }


  create(baby: Baby): Observable<Baby> {
    return this.httpClient.post<Baby>(this.apiUrl, baby);
  }

  findAll(): Observable<Count<Baby>> {
    return this.httpClient.get<Count<Baby>>(this.apiUrl);
  }


}
