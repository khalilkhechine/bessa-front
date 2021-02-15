import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {Observable} from 'rxjs';
import {BabyBottle} from '../models/baby-bottle.model';
import {Diaper} from '../models/diaper.model';
import {Vaccine} from '../models/vaccine.model';
import {Growth} from '../models/growth.model';
import {Temperature} from '../models/temperature.model';
import {Medicine} from '../models/medicine.model';
import {Doctor} from '../models/doctor.model';

@Injectable({
  providedIn: 'root'
})
export class BabyInformationService {

  private babyBottleUrl = environment.apiUrl + environment.babyBottleUrl;
  private diaperUrl = environment.apiUrl + environment.diaperUrl;
  private vaccineUrl = environment.apiUrl + environment.vaccineUrl;
  private growthUrl = environment.apiUrl + environment.growthUrl;
  private temperatureUrl = environment.apiUrl + environment.temperatureUrl;
  private medicineUrl = environment.apiUrl + environment.medicineUrl;
  private doctorUrl = environment.apiUrl + environment.doctorUrl;

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

  getGrowthByBaby(id): Observable<Growth> {
    return this.httpClient.get<Growth>(this.growthUrl + '/baby/' + id);
  }

  addGrowth(id, growth): Observable<Growth> {
    return this.httpClient.post<Growth>(this.growthUrl + '/' + id, growth);
  }

  createGrowth(babyId, growth): Observable<Growth> {
    return this.httpClient.post<Growth>(this.growthUrl + '/baby/' +  babyId, growth);
  }

  getTemperatureByBaby(babyId: any): Observable<Temperature> {
    return this.httpClient.get<Temperature>(this.temperatureUrl + '/baby/' + babyId);
  }

  addTemperature(id: string, temperature): Observable<Temperature> {
    return this.httpClient.post<Temperature>(this.temperatureUrl + '/' + id, temperature);
  }

  createTemperature(id: string, temperature: any): Observable<Temperature> {
    return this.httpClient.post<Temperature>(this.temperatureUrl + '/baby/' +  id, temperature);
  }

  getMedicineByBaby(babyId: any): Observable<Medicine[]> {
    return this.httpClient.get<Medicine[]>(this.medicineUrl + '/baby/' + babyId);
  }

  addMedicine(medicine): Observable<Medicine> {
    return this.httpClient.post<Medicine>(this.medicineUrl, medicine);
  }

  finishMedicine(id: string): Observable<Medicine> {
    return this.httpClient.post<Medicine>(this.medicineUrl + '/' +  id + '/finished', null);
  }

  getDoctorByBaby(babyId: any): Observable<Doctor[]> {
    return this.httpClient.get<Doctor[]>(this.doctorUrl + '/baby/' + babyId);
  }

  addDoctor(doctor): Observable<Doctor> {
    return this.httpClient.post<Doctor>(this.doctorUrl, doctor);
  }

  addAppointment(id: string, appointment): Observable<Doctor> {
    return this.httpClient.post<Doctor>(this.doctorUrl + '/' +  id + '/appointment', appointment);
  }

  getHeightStat(id): Observable<any> {
    return this.httpClient.get<any>(this.growthUrl + '/baby/' + id + '/stat/height');
  }
}
