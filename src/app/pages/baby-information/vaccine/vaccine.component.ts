import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {BabyService} from '../../../services/baby.service';
import {BabyInformationService} from '../../../services/baby-information.service';
import {Vaccine} from '../../../models/vaccine.model';

@Component({
  selector: 'app-vaccine',
  templateUrl: './vaccine.component.html',
  styleUrls: ['./vaccine.component.css']
})
export class VaccineComponent implements OnInit {
  private _selectedBabyId: any;
  vaccines: Vaccine[];

  @Input() set selectedBabyId(selectedBabyId) {
    this._selectedBabyId = selectedBabyId;
    if (selectedBabyId) {
      this.babyInformationService.getVaccinesByBaby(this._selectedBabyId).subscribe(response => {
        this.vaccines = response;
      });
    }}

  get selectedBabyId() {
    return this._selectedBabyId;
  }
  vaccineFormGroup: FormGroup;
  showForm = true;
  selectedVaccine: Vaccine;
  mode: 'create' | 'update' | 'list' = 'list';

  constructor(
    private formBuilder: FormBuilder,
    private babyService: BabyService,
    private babyInformationService: BabyInformationService
  ) { }

  ngOnInit(): void {
    this.initDiaperFormGroup();
  }

  private initDiaperFormGroup(vaccine?: Vaccine) {
    this.vaccineFormGroup = this.formBuilder.group({
      period: [vaccine ? vaccine.period : null, [Validators.required, Validators.min(0)]],
      createdAt: [vaccine ? vaccine.createdAt : null, Validators.required],
      name: [vaccine ? vaccine.name : null, Validators.required],
      description: [vaccine ? vaccine.description : null],
    });
  }

  submitVaccineInformation() {
    if (this.vaccineFormGroup.invalid) {
      return;
    }

    if (this.mode === 'create') {
      const vaccine: Vaccine = {
        createdAt: this.vaccineFormGroup.controls.createdAt.value,
        period: this.vaccineFormGroup.controls.period.value,
        name: this.vaccineFormGroup.controls.name.value,
        description: this.vaccineFormGroup.controls.description.value,
        vaccineDates: [],
        baby: this.selectedBabyId
      };

      this.babyInformationService.createVaccine(vaccine).subscribe(response => {
        if (!(this.vaccines && this.vaccines.length > 0)) {
          this.vaccines = [];
        }
        this.vaccines.push(response);
        this.mode = 'list';
      });
    } else {
      this.selectedVaccine.period = this.vaccineFormGroup.controls.period.value;
      this.selectedVaccine.createdAt = this.vaccineFormGroup.controls.createdAt.value;
      this.selectedVaccine.description = this.vaccineFormGroup.controls.description.value;
      this.selectedVaccine.name = this.vaccineFormGroup.controls.name.value;
      this.babyInformationService.updateVaccine(this.selectedVaccine._id, this.selectedVaccine).subscribe(response => {
       const index = this.vaccines.findIndex(e => e._id === response._id);
       this.vaccines[index] = response;
       this.mode = 'list';
      });
    }
  }

  getNextDate(vaccineDates: {vaccineDate: Date}[]) {
    if (vaccineDates && vaccineDates.length > 0) {
      return vaccineDates[vaccineDates.length - 1].vaccineDate;
    }
  }

  initUpdate(v: Vaccine) {
    this.selectedVaccine = v;
    this.initDiaperFormGroup(v);
    this.mode = 'update';
  }

  initCreate() {
    this.selectedVaccine = null;
    this.initDiaperFormGroup();
    this.mode = 'create';
  }
}
