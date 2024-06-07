import { AuthService } from '../../../services/auth/auth.service';
import { Component, inject } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { FormError } from '../../../models/formError.model';
import { NgClass } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [
    FontAwesomeModule,
    NgClass,
    ReactiveFormsModule
  ],
  templateUrl: './auth.component.html'
})
export class AuthComponent {
  private authService: AuthService = inject(AuthService);
  private formBuilder: FormBuilder = inject(FormBuilder);
  private router: Router = inject(Router);

  authForm = this.formBuilder.nonNullable.group({
    password: ['', [Validators.required]],
    passwordConfirm: [{ value: '', disabled: true }, [Validators.required]],
    username: ['', [Validators.required]]
  });

  formError: FormError = new FormError();
  showRegistration: boolean = false;

  constructor() {}

  cancel(): void {
    this.authForm.setValue({
      password: '',
      passwordConfirm: '',
      username: ''
    });

    this.router.navigate(['/']);
  }

  dismissAlert(): void {
    this.formError.show = false;
  }

  hideAlert(): void {
    this.formError.show = false;
  }

  loginWithGoogle(): void {
    this.authService.loginWithGoogle();
  }

  submitAuthForm(): void {
    const authForm = this.authForm.getRawValue();

    if (this.showRegistration) {
      if (authForm.password === authForm.passwordConfirm) {
        this.authService.registerUser(authForm.username, authForm.password).catch((error: Error) => {
          this.authForm.controls.password.reset();
          this.authForm.controls.passwordConfirm.reset();

          this.formError.message = error.message;
          this.formError.show = true;
        });
      } else {
        this.formError.message = 'Passwords do not match';
        this.formError.show = true;
      }
    } else {
      this.authService.login(authForm.username, authForm.password).catch((error: Error) => {
        this.authForm.controls.password.reset();

        this.formError.message = error.message;
        this.formError.show = true;
      });
    }
  }

  toggleRegistration(): void {
    this.showRegistration = !this.showRegistration;

    if (this.showRegistration) {
      this.authForm.controls['passwordConfirm'].enable();
    } else {
      this.authForm.patchValue({ passwordConfirm: '' });
      this.authForm.controls['passwordConfirm'].disable();
    }
  }
}
