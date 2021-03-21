import { AuthService } from './auth.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FormMessage } from '../../models/formMessage.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {
  authForm: FormGroup;
  formError: FormMessage;
  showRegistration = false;

  constructor(private authService: AuthService, private router: Router) {
    this.formError = new FormMessage();
  }

  ngOnInit() {
    this.authForm = new FormGroup({
      password: new FormControl(null, Validators.required),
      passwordConfirm: new FormControl({ value: null, disabled: true }, Validators.required),
      username: new FormControl(null, [Validators.required, Validators.email])
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
      if (this.authForm.get('password').value === this.authForm.get('passwordConfirm').value) {
        this.authService.registerUser(this.authForm.get('username').value, this.authForm.get('password').value).catch((error) => {
          this.formError.message = error.message;
          this.formError.show = true;
        });
      } else {
        this.formError.message = 'Passwords do not match';
        this.formError.show = true;
      }
    } else {
      this.authService.login(this.authForm.get('username').value, this.authForm.get('password').value).catch((error) => {
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
      this.authForm.patchValue({ passwordConfirm: null });
      this.authForm.get('passwordConfirm').disable();
    }
  }
}
