import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppRoutingModule } from '../app-routing.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AuthService } from '../auth/auth.service';
import { BracketComponent } from './bracket/bracket.component';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { ScoreboardComponent } from './scoreboard/scoreboard.component';

@NgModule({
  declarations: [
    BracketComponent,
    FooterComponent,
    HeaderComponent,
    ScoreboardComponent
  ],
  imports: [
    AppRoutingModule,
    CommonModule,
    NgbModule
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
