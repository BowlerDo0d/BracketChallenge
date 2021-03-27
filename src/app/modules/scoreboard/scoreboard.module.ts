import { NgModule } from '@angular/core';
import { BracketCardComponent } from './bracket-card/bracket-card.component';
import { ScoreboardComponent } from './scoreboard.component';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import { StickyDirectiveModule } from 'ngx-sticky-directive';

@NgModule({
  declarations: [
    BracketCardComponent,
    ScoreboardComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    StickyDirectiveModule
  ],
  providers: [],
  exports: [ScoreboardComponent]
})
export class ScoreboardModule { }
