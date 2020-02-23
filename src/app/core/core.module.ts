import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { NgModule } from '@angular/core';

import { CoreRoutingModule } from './core-routing.module';
import { ScoreboardComponent } from './scoreboard/scoreboard.component';

@NgModule({
  declarations: [ScoreboardComponent],
  imports: [
    CommonModule,
    MatIconModule,
    MatTableModule,
    CoreRoutingModule
  ]
})
export class CoreModule { }
