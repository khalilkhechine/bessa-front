import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {BabyService} from '../../../services/baby.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Baby} from '../../../models/baby.model';

@Component({
  selector: 'app-baby-create',
  templateUrl: './baby-create.component.html',
  styleUrls: ['./baby-create.component.css']
})
export class BabyCreateComponent implements OnInit {
  addBabyForm: FormGroup;
  private baby;
  isUpdate: boolean;

  constructor(
    private formBuilder: FormBuilder,
    private babyService: BabyService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
  }

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe((params) => {
      if (params.id) {
        this.babyService.getById(params.id).subscribe((response) => {
          this.isUpdate = true;
          this.baby = response;
          this.initializeForm();
        });
      } else {
        this.initializeForm();
      }
    });
  }

  submit() {
    if (this.addBabyForm.invalid) {
      return;
    }
    if (!this.isUpdate) {
      this.baby = {};
    }
    this.baby.birthday = new Date(
      this.addBabyForm.controls.birthday.value.year,
      this.addBabyForm.controls.birthday.value.month,
      this.addBabyForm.controls.birthday.value.day);
    this.baby.gender = this.addBabyForm.controls.gender.value;
    this.baby.name = this.addBabyForm.controls.name.value;
    this.baby.weight = this.addBabyForm.controls.weight.value;
    this.baby.photo = this.addBabyForm.controls.photo.value;
    if (this.isUpdate) {
      this.babyService.update(this.baby).subscribe(() => {
        this.router.navigate(['/baby']);
      });
    } else {
      this.babyService.create(this.baby).subscribe(() => {
        this.router.navigate(['/baby']);
      });
    }
  }

  private initializeForm() {
    const date = this.baby ? new Date(this.baby.birthday) : null;
    this.addBabyForm = this.formBuilder.group({
      name: [this.baby ? this.baby.name : null, Validators.required],
      birthday: [this.baby ? {year: date.getUTCFullYear(), month: date.getMonth(), day: date.getDate()} : null, Validators.required],
      gender: [this.baby ? this.baby.gender : null, Validators.required],
      weight: [this.baby ? this.baby.weight : null, [Validators.min(0), Validators.required]],
      photo: [this.baby ? this.baby.photo : null]
    });
  }
}
