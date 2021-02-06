import {Component, Input, OnInit} from '@angular/core';
import {BabyService} from '../../../services/baby.service';
import {Baby} from '../../../models/baby.model';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-create-baby-information',
  templateUrl: './create-baby-information.component.html',
  styleUrls: ['./create-baby-information.component.css']
})
export class CreateBabyInformationComponent implements OnInit {

  @Input() selectedBabyId;
  babyList: Baby[];
  babyFormControl: FormControl = new FormControl();

  constructor(
    private formBuilder: FormBuilder,
    private babyService: BabyService
  ) { }

  ngOnInit(): void {
    this.initSelectedBabyFormControl();
  }

  private initSelectedBabyFormControl() {
    this.babyService.findAll().subscribe(response => {
      this.babyList = response.result;
    });
    this.babyFormControl.valueChanges.subscribe((value: string) => {
      this.selectedBabyId = value;
    });
  }
}
