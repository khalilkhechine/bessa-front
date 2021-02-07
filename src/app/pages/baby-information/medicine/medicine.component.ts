import {Component, Input, OnInit} from '@angular/core';
import {Growth, Growthing} from '../../../models/growth.model';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {BabyInformationService} from '../../../services/baby-information.service';
import {Medicine} from '../../../models/medicine.model';

@Component({
  selector: 'app-medicine',
  templateUrl: './medicine.component.html',
  styleUrls: ['./medicine.component.css']
})
export class MedicineComponent implements OnInit {
  private _selectedBabyId: any;
  medicines: Medicine[];
  medicineFormGroup: FormGroup;
  mode: 'create' | 'list' = 'create';

  @Input() set selectedBabyId(selectedBabyId) {
    this._selectedBabyId = selectedBabyId;
    if (selectedBabyId) {
      this.babyInformationService.getMedicineByBaby(this._selectedBabyId).subscribe(response => {
        if (response && response.length > 0) {
          this.mode = 'list';
        } else {
          this.mode = 'create';
        }
        this.medicines = response;
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
    this.initMedicineFormGroup();

  }

  private initMedicineFormGroup() {
    this.medicineFormGroup = this.formBuilder.group({
      name: [null, [Validators.required]],
      tokenDate: [null, [Validators.required]],
      timesNumberPerDay: [null, [Validators.required, Validators.min(0)]],
    });
  }

  initCreate() {
    this.initMedicineFormGroup();
    this.mode = 'create';
  }

  submitMedicineInformation() {
    if (this.medicineFormGroup.invalid) {
      return;
    }
    const medicine: Medicine = {
      finished: false,
      name: this.medicineFormGroup.controls.name.value,
      timesNumberPerDay: this.medicineFormGroup.controls.timesNumberPerDay.value,
      tokenDate: this.medicineFormGroup.controls.tokenDate.value,
      baby: this.selectedBabyId,
    };
    this.babyInformationService.addMedicine(medicine).subscribe(response => {
      this.medicines.push(response);
      this.mode = 'list';
    });
  }

  finishMedicine(id) {
    this.babyInformationService.finishMedicine(id).subscribe(response => {
      const index = this.medicines.findIndex(e => e._id === id);
      this.medicines[index] = response;
    });
  }
}

