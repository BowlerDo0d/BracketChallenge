import { NgModule } from '@angular/core';
import { BracketCardComponent } from './bracket-card/bracket-card.component';
import { ScoreboardComponent } from './scoreboard.component';
import { CoreModule } from 'src/app/core/core.module';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [
    BracketCardComponent,
    ScoreboardComponent
  ],
  imports: [
    CommonModule,
    CoreModule
  ],
  providers: [],
  exports: [ScoreboardComponent]
})
export class ScoreboardModule { }
