import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminComponent } from './admin.component';
import { AuthService } from '../auth/auth.service';

@NgModule({
  declarations: [AdminComponent],
  imports: [
    CommonModule
  ],
  providers: [
    AuthService
  ]
})
export class AdminModule { }
