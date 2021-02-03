import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {Observable} from 'rxjs';
import {BabyBottle} from '../models/baby-bottle.model';

@Injectable({
  providedIn: 'root'
})
export class BabyInformationService {

  private babyBottleUrl = environment.apiUrl + environment.babyBottleUrl;

  constructor(private httpClient: HttpClient) { }

  createBabyBottle(babyBottle): Observable<BabyBottle> {
    return this.httpClient.post<BabyBottle>(this.babyBottleUrl, babyBottle);
  }

  updateBabyBottle(babyBottle): Observable<BabyBottle> {
    return this.httpClient.put<BabyBottle>(this.babyBottleUrl, babyBottle);
  }

  getBabyBottleById(id): Observable<BabyBottle> {
    return this.httpClient.get<BabyBottle>(this.babyBottleUrl + '/' + id);
  }

  getBabyBottleByBaby(babyId): Observable<BabyBottle> {
    return this.httpClient.get<BabyBottle>(this.babyBottleUrl + '/baby/' + babyId);
  }
}
