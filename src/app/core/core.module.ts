import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CoreRoutingModule } from './core-routing.module';
import { ScoreboardComponent } from './scoreboard/scoreboard.component';

@NgModule({
  declarations: [ScoreboardComponent],
  imports: [
    CommonModule,
    CoreRoutingModule
  ]
})
export class CoreModule { }
