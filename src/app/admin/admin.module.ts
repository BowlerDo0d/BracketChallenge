import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminComponent } from './admin.component';
import { AuthService } from '../auth/auth.service';
import { AdminRoutingModule } from './admin-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { ReversePipe } from './reverse-pipe';
import { FinancialComponent } from './financial/financial.component';
import { ResultsComponent } from './results/results.component';
import { TiebreakersComponent } from './tiebreakers/tiebreakers.component';

@NgModule({
  declarations: [
    AdminComponent,
    FinancialComponent,
    ReversePipe,
    ResultsComponent,
    TiebreakersComponent
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
