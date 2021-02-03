import { Component, OnInit } from '@angular/core';
import {BabyService} from '../../../services/baby.service';
import {Baby} from '../../../models/baby.model';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {BabyBottle} from '../../../models/baby-bottle.model';
import {BabyInformationService} from '../../../services/baby-information.service';

@Component({
  selector: 'app-create-baby-information',
  templateUrl: './create-baby-information.component.html',
  styleUrls: ['./create-baby-information.component.css']
})
export class CreateBabyInformationComponent implements OnInit {

  babyList: Baby[];
  babyFormControl: FormControl = new FormControl();
  selectedBabyId: string;
  babyBottleFormGroup: FormGroup;
  isBabyBottleInformationAdded = false;

  constructor(
    private formBuilder: FormBuilder,
    private babyService: BabyService,
    private babyInformationService: BabyInformationService
  ) { }

  ngOnInit(): void {
    this.initSelectedBabyFormControl();
    this.initForms();
  }

  private initSelectedBabyFormControl() {
    this.babyService.findAll().subscribe(response => {
      this.babyList = response.result;
    });
    this.babyFormControl.valueChanges.subscribe((value: string) => {
      this.selectedBabyId = value;
    });
  }

  private initBabyBottleFormGroup() {
    this.babyBottleFormGroup = this.formBuilder.group({
      period: [4, [Validators.required, Validators.min(0), Validators.max(24)]]
    });
  }

  private initForms() {
    this.initBabyBottleFormGroup();
  }

  submitBabyBottleInformation() {
    if (this.babyBottleFormGroup.invalid) {
      return;
    }

    const babyBottle: BabyBottle = {
      createdAt: new Date(),
      period: this.babyBottleFormGroup.controls.period.value,
      tokenBabyBottle: [],
      baby: this.selectedBabyId
    };

    this.babyInformationService.createBabyBottle(babyBottle).subscribe(response => {
      console.log(response);
      this.isBabyBottleInformationAdded = true;
    });
  }
}
