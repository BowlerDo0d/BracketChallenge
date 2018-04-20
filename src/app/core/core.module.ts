import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppRoutingModule } from '../app-routing.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ReactiveFormsModule } from '@angular/forms';

import { AuthService } from '../auth/auth.service';
import { BracketComponent } from './bracket/bracket.component';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { ScoreboardComponent } from './scoreboard/scoreboard.component';
import { ToggleSwitchComponent } from './toggle-switch/toggle-switch.component';

@NgModule({
  declarations: [
    BracketComponent,
    FooterComponent,
    HeaderComponent,
    ScoreboardComponent,
    ToggleSwitchComponent
  ],
  imports: [
    AppRoutingModule,
    CommonModule,
    NgbModule,
    ReactiveFormsModule
  ],
  exports: [
    AppRoutingModule,
    FooterComponent,
    HeaderComponent
  ],
  providers: [
    AuthService
  ]
})
export class CoreModule { }
