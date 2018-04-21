import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminComponent } from './admin.component';
import { AuthService } from '../auth/auth.service';
import { AdminRoutingModule } from './admin-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { ReversePipe } from './reverse-pipe';
import { ResultsComponent } from './results/results.component';

@NgModule({
  declarations: [
    AdminComponent,
    ReversePipe,
    ResultsComponent
  ],
  imports: [
    AdminRoutingModule,
    CommonModule,
    ReactiveFormsModule
  ],
  providers: [
    AuthService
  ]
})
export class AdminModule { }
