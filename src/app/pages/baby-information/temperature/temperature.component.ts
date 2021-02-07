import {Component, Input, OnInit} from '@angular/core';
import {Growth, Growthing} from '../../../models/growth.model';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {BabyInformationService} from '../../../services/baby-information.service';
import {Temperature} from '../../../models/temperature.model';

@Component({
  selector: 'app-temperature',
  templateUrl: './temperature.component.html',
  styleUrls: ['./temperature.component.css']
})
export class TemperatureComponent implements OnInit {
  private _selectedBabyId: any;
  temperature: Temperature;
  temperatureFormGroup: FormGroup;
  mode: 'create' | 'list' = 'create';

  @Input() set selectedBabyId(selectedBabyId) {
    this._selectedBabyId = selectedBabyId;
    if (selectedBabyId) {
      this.babyInformationService.getTemperatureByBaby(this._selectedBabyId).subscribe(response => {
        if (response) {
          this.mode = 'list';
        } else {
          this.mode = 'create';
        }
        this.temperature = response;
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
    this.initTemperatureFormGroup();

  }

  private initTemperatureFormGroup() {
    this.temperatureFormGroup = this.formBuilder.group({
      date: [null, [Validators.required]],
      temperature: [null, [Validators.required, Validators.min(0)]],
    });
  }

  initCreate() {
    this.initTemperatureFormGroup();
    this.mode = 'create';
  }

  submitGrowthInformation() {
    if (this.temperatureFormGroup.invalid) {
      return;
    }
    if (this.temperature) {
      this.babyInformationService.addTemperature(this.temperature._id, this.temperatureFormGroup.value).subscribe(response => {
        this.temperature = response;
        this.mode = 'list';
      });
    } else {
      this.babyInformationService.createTemperature(this.selectedBabyId, this.temperatureFormGroup.value).subscribe(response => {
        this.temperature = response;
        this.mode = 'list';
      });
    }
  }
}
