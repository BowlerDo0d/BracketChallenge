import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { BracketCardComponent } from './bracket-card/bracket-card.component';
import { CoreRoutingModule } from './core-routing.module';
import { ScoreboardComponent } from './scoreboard/scoreboard.component';
import { SvgDefinitionsComponent } from './svg/svg-definitions/svg-definitions.component';
import { SvgIconComponent } from './svg/svg-icon/svg-icon.component';

@NgModule({
  declarations: [
    BracketCardComponent,
    ScoreboardComponent,
    SvgDefinitionsComponent,
    SvgIconComponent
  ],
  imports: [
    CommonModule,
    CoreRoutingModule
  ],
  exports: [SvgDefinitionsComponent]
})
export class CoreModule { }
