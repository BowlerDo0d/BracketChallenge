import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BracketComponent } from './core/bracket/bracket.component';
import { ScoreboardComponent } from './core/scoreboard/scoreboard.component';

const appRoutes: Routes = [
  { path: '', component: ScoreboardComponent },
  { path: 'bracket', component: BracketComponent }
];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes)
  ],
  exports: [
    RouterModule
  ],
  providers: []
})
export class AppRoutingModule {}
