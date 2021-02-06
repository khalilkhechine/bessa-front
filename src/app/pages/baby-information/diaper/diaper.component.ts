import {Component, Input, OnInit} from '@angular/core';
import {BabyBottle} from '../../../models/baby-bottle.model';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {BabyService} from '../../../services/baby.service';
import {BabyInformationService} from '../../../services/baby-information.service';
import {Diaper} from '../../../models/diaper.model';

@Component({
  selector: 'app-diaper',
  templateUrl: './diaper.component.html',
  styleUrls: ['./diaper.component.css']
})
export class DiaperComponent implements OnInit {
  private _selectedBabyId: any;
  diaper: Diaper;

  @Input() set selectedBabyId(selectedBabyId) {
    this._selectedBabyId = selectedBabyId;
    if (selectedBabyId) {
      this.babyInformationService.getDiaperByBaby(this._selectedBabyId).subscribe(response => {
        this.diaper = response;
        console.log(response);
        if (response) {
          this.initDiaperFormGroup(this.diaper);
        }
      });
    }}

  get selectedBabyId() {
    return this._selectedBabyId;
  }
  diaperFormGroup: FormGroup;
  showForm = true;

  constructor(
    private formBuilder: FormBuilder,
    private babyService: BabyService,
    private babyInformationService: BabyInformationService
  ) { }

  ngOnInit(): void {
    this.initDiaperFormGroup();
  }

  private initDiaperFormGroup(diaper?: Diaper) {
    this.diaperFormGroup = this.formBuilder.group({
      period: [diaper ? diaper.period : 4, [Validators.required, Validators.min(0), Validators.max(24)]]
    });
  }

  submitDiaperInformation() {
    if (this.diaperFormGroup.invalid) {
      return;
    }

    const diaper: Diaper = {
      createdAt: new Date(),
      period: this.diaperFormGroup.controls.period.value,
      usedDiaper: [],
      baby: this.selectedBabyId
    };

    if (this.diaper) {
      this.babyInformationService
      .updateDiaper(this.diaper._id, this.diaperFormGroup.controls.period.value)
      .subscribe(response => {
        console.log(response);
        this.diaper = response;
      });
    } else {
      this.babyInformationService.createDiaper(diaper).subscribe(response => {
        console.log(response);
        this.diaper = response;
      });
    }
  }

  getNextBabyBottle() {
    if (this.diaper && this.diaper.usedDiaper) {
      return this.diaper.usedDiaper[this.diaper.usedDiaper.length - 1].usedDate;
    }
  }
}
