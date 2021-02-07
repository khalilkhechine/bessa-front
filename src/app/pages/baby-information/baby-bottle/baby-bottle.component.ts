import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {BabyService} from '../../../services/baby.service';
import {BabyInformationService} from '../../../services/baby-information.service';
import {BabyBottle} from '../../../models/baby-bottle.model';

@Component({
  selector: 'app-baby-bottle',
  templateUrl: './baby-bottle.component.html',
  styleUrls: ['./baby-bottle.component.css']
})
export class BabyBottleComponent implements OnInit {
  private _selectedBabyId: any;
  babyBottle: BabyBottle;

  @Input() set selectedBabyId(selectedBabyId) {
    this._selectedBabyId = selectedBabyId;
    if (selectedBabyId) {
      this.babyInformationService.getBabyBottleByBaby(this._selectedBabyId).subscribe(response => {
        this.babyBottle = response;
        if (response) {
          this.initBabyBottleFormGroup(this.babyBottle);
        }
      });
    }}

  get selectedBabyId() {
    return this._selectedBabyId;
  }
  babyBottleFormGroup: FormGroup;
  showForm = true;

  constructor(
    private formBuilder: FormBuilder,
    private babyService: BabyService,
    private babyInformationService: BabyInformationService
  ) { }

  ngOnInit(): void {
    this.initBabyBottleFormGroup();
  }

  private initBabyBottleFormGroup(babyBottle?: BabyBottle) {
    this.babyBottleFormGroup = this.formBuilder.group({
      period: [babyBottle ? babyBottle.period : 4, [Validators.required, Validators.min(0), Validators.max(24)]]
    });
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

    if (this.babyBottle) {
      this.babyInformationService
        .updateBabyBottle(this.babyBottle._id, this.babyBottleFormGroup.controls.period.value)
        .subscribe(response => {
        this.babyBottle = response;
      });
    } else {
      this.babyInformationService.createBabyBottle(babyBottle).subscribe(response => {
        this.babyBottle = response;
      });
    }
  }

  getNextBabyBottle() {
    if (this.babyBottle && this.babyBottle.tokenBabyBottle) {
      return this.babyBottle.tokenBabyBottle[this.babyBottle.tokenBabyBottle.length - 1].tokenDate;
    }
  }
}
