import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService } from './auth.service';
import { FormError } from '../models/formError.model';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {
  authForm: FormGroup;
  formError: FormError;
  showRegistration = false;

  constructor(private authService: AuthService, private router: Router) {
    this.formError = new FormError();
  }

  ngOnInit() {
    this.authForm = new FormGroup({
      password: new FormControl(null, Validators.required),
      passwordConfirm: new FormControl({ value: null, disabled: true }, Validators.required),
      username: new FormControl(null, Validators.required)
    });
  }

  cancel() {
    this.authForm.setValue({
      password: null,
      passwordConfirm: null,
      username: null
    });

    this.router.navigate(['/']);
  }

  dismissAlert() {
    this.formError.show = false;
  }

  loginWithGoogle() {
    this.authService.loginWithGoogle();
  }

  submitAuthForm() {
    if (this.showRegistration) {
      if (this.authForm.value['password'] === this.authForm.value['passwordConfirm']) {
        this.authService.registerUser(this.authForm.value['username'], this.authForm.value['password']).catch((error) => {
          this.formError.message = error.message;
          this.formError.show = true;
        });
      } else {
        this.formError.message = 'Passwords do not match';
        this.formError.show = true;
      }
    } else {
      this.authService.login(this.authForm.value['username'], this.authForm.value['password']).catch((error) => {
        this.formError.message = error.message;
        this.formError.show = true;
      });
    }
  }

  toggleRegistration() {
    this.showRegistration = !this.showRegistration;

    if (this.showRegistration) {
      this.authForm.get('passwordConfirm').enable();
    } else {
      this.authForm.patchValue({ 'passwordConfirm': null });
      this.authForm.get('passwordConfirm').disable();
    }
  }
}
