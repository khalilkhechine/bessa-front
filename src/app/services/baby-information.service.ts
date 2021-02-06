import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {Observable} from 'rxjs';
import {BabyBottle} from '../models/baby-bottle.model';
import {Diaper} from '../models/diaper.model';
import {Vaccine} from '../models/vaccine.model';

@Injectable({
  providedIn: 'root'
})
export class BabyInformationService {

  private babyBottleUrl = environment.apiUrl + environment.babyBottleUrl;
  private diaperUrl = environment.apiUrl + environment.diaperUrl;
  private vaccineUrl = environment.apiUrl + environment.vaccineUrl;

  constructor(private httpClient: HttpClient) { }

  createBabyBottle(babyBottle): Observable<BabyBottle> {
    return this.httpClient.post<BabyBottle>(this.babyBottleUrl, babyBottle);
  }

  updateBabyBottle(id, period): Observable<BabyBottle> {
    return this.httpClient.put<BabyBottle>(this.babyBottleUrl + '/' + id, {period: period});
  }

  getBabyBottleByBaby(babyId): Observable<BabyBottle> {
    return this.httpClient.get<BabyBottle>(this.babyBottleUrl + '/baby/' + babyId);
  }

  createDiaper(babyBottle): Observable<Diaper> {
    return this.httpClient.post<Diaper>(this.diaperUrl, babyBottle);
  }

  updateDiaper(id, period): Observable<Diaper> {
    return this.httpClient.put<Diaper>(this.diaperUrl + '/' + id, {period: period});
  }

  getDiaperByBaby(babyId): Observable<Diaper> {
    return this.httpClient.get<Diaper>(this.diaperUrl + '/baby/' + babyId);
  }

  getVaccinesByBaby(id): Observable<Vaccine[]> {
    return this.httpClient.get<Vaccine[]>(this.vaccineUrl + '/baby/' + id);
  }

  createVaccine(vaccine): Observable<Vaccine> {
    return this.httpClient.post<Vaccine>(this.vaccineUrl, vaccine);
  }

  updateVaccine(id, vaccine: Vaccine) {
    return this.httpClient.put<Vaccine>(this.vaccineUrl + '/' + id, vaccine);
  }
}
