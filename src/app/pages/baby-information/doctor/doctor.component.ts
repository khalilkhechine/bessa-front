import {Component, Input, OnInit} from '@angular/core';
import {Growth, Growthing} from '../../../models/growth.model';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {BabyInformationService} from '../../../services/baby-information.service';
import {Doctor} from '../../../models/doctor.model';

@Component({
  selector: 'app-doctor',
  templateUrl: './doctor.component.html',
  styleUrls: ['./doctor.component.css']
})
export class DoctorComponent implements OnInit {
  private _selectedBabyId: any;
  doctors: Doctor[];
  doctorFormGroup: FormGroup;
  appointmentFormGroup: FormGroup;
  mode: 'create' | 'list' | 'appointment-list' | 'appointment-create' = 'create';
  selectedDoctor: Doctor;

  @Input() set selectedBabyId(selectedBabyId) {
    this._selectedBabyId = selectedBabyId;
    if (selectedBabyId) {
      this.babyInformationService.getDoctorByBaby(this._selectedBabyId).subscribe(response => {
        if (response && response.length > 0) {
          this.mode = 'list';
        } else {
          this.mode = 'create';
        }
        this.doctors = response;
      });
    }}

  get selectedBabyId() {
    return this._selectedBabyId;
  }

  constructor(
    private formBuilder: FormBuilder,
    private babyInformationService: BabyInformationService
  ) { }

  ngOnInit(): void {
    this.initDoctorFormGroup();

  }

  private initDoctorFormGroup() {
    this.doctorFormGroup = this.formBuilder.group({
      name: [null, [Validators.required]],
      email: [null, [Validators.required, Validators.email]],
      address: [null, [Validators.required]],
      speciality: [null, [Validators.required]],
    });
    this.appointmentFormGroup =  this.formBuilder.group({
      appointment: [null, Validators.required]
    });
  }

  initCreate() {
    this.initDoctorFormGroup();
    this.mode = 'create';
  }

  initCreateAppointment(doctor) {
    this.selectedDoctor = null;
    this.selectedDoctor = doctor;
    this.mode = 'appointment-create';
  }

  submitDoctorInformation() {
    if (this.doctorFormGroup.invalid) {
      return;
    }
    const doctor: Doctor = {
      name: this.doctorFormGroup.controls.name.value,
      email: this.doctorFormGroup.controls.email.value,
      address: this.doctorFormGroup.controls.address.value,
      speciality: this.doctorFormGroup.controls.speciality.value,
      appointments: [],
      baby: this.selectedBabyId,
    };

    this.babyInformationService.addDoctor(doctor).subscribe(response => {
      if (!this.doctors) {
        this.doctors = [];
      }
      this.doctors.push(response);
      this.mode = 'list';
    });
  }

  submitAppointment() {
    if (this.appointmentFormGroup.invalid) {
      return;
    }
    const appointment = {
      appointment: this.appointmentFormGroup.controls.appointment.value
    };

    this.babyInformationService.addAppointment(this.selectedDoctor._id, appointment).subscribe(response  => {
      const index = this.doctors.findIndex(e => e._id === this.selectedDoctor._id);
      this.doctors[index] = response;
      this.mode = 'appointment-list';
    });

  }

  initListAppointments(d: Doctor) {
    this.selectedDoctor = d;
    this.mode = 'appointment-list';
  }
}

