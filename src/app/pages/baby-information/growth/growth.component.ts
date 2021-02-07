import {Component, Input, OnInit} from '@angular/core';
import {Growth, Growthing} from '../../../models/growth.model';
import {BabyInformationService} from '../../../services/baby-information.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-growth',
  templateUrl: './growth.component.html',
  styleUrls: ['./growth.component.css']
})
export class GrowthComponent implements OnInit {
  private _selectedBabyId: any;
  growth: Growth;
  growthFormGroup: FormGroup;
  mode: 'create' | 'list' = 'create';
  selectedGrowth: Growthing;

  @Input() set selectedBabyId(selectedBabyId) {
    this._selectedBabyId = selectedBabyId;
    if (selectedBabyId) {
      this.babyInformationService.getGrowthByBaby(this._selectedBabyId).subscribe(response => {
        if (response) {
          this.mode = 'list';
        } else {
          this.mode = 'create';
        }
        this.growth = response;
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
    this.initGrowthFormGroup();

  }

  private initGrowthFormGroup() {
    this.growthFormGroup = this.formBuilder.group({
      date: [null, [Validators.required]],
      height: [null, [Validators.required, Validators.min(0)]],
      weight: [null, [Validators.required, Validators.min(0)]],
    });
  }

  initCreate() {
    this.selectedGrowth = null;
    this.initGrowthFormGroup();
    this.mode = 'create';
  }

  submitGrowthInformation() {
    if (this.growthFormGroup.invalid) {
      return;
    }
    if (this.growth) {
      this.babyInformationService.addGrowth(this.growth._id, this.growthFormGroup.value).subscribe(response => {
        this.growth = response;
        this.mode = 'list';
      });
    } else {
      this.babyInformationService.createGrowth(this.selectedBabyId, this.growthFormGroup.value).subscribe(response => {
        this.growth = response;
        this.mode = 'list';
      });
    }
  }
}
