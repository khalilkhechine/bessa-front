import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {UserService} from '../../services/user.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  registerForm: FormGroup;
  submitted: boolean;
  error: boolean;
  redirectMessageShow: boolean;
  time: number;

  constructor(private formBuilder: FormBuilder, private userService: UserService, private router: Router) { }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      name: [null, [Validators.required]],
      email: [null, [Validators.required, Validators.email]],
      gender: [null, [Validators.required]],
      password: [null, [Validators.required, Validators.maxLength(8)]]
    });
  }

  submit() {
    console.log(this.registerForm.value);
    this.error = false;
    this.submitted = true;
    if (this.registerForm.invalid) {
      this.error = true;
      return;
    }

    this.userService.register(this.registerForm.value).subscribe(response => {
      if (response) {
          this.error = false;
          this.redirectMessageShow = true;
          this.router.navigate(['/login']);
      }
    }, () => this.error = true);
  }
}
