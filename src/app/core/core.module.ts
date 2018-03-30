import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppRoutingModule } from '../app-routing.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ScoreboardComponent } from './scoreboard/scoreboard.component';
import { BracketComponent } from './bracket/bracket.component';
import { AuthService } from '../auth/auth.service';

@NgModule({
  declarations: [
    ScoreboardComponent,
    BracketComponent
  ],
  imports: [
    AppRoutingModule,
    CommonModule,
    NgbModule,
    AuthService
  ],
  exports: [
    AppRoutingModule
  ]
})
export class CoreModule { }
