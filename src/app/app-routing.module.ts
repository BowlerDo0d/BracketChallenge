import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BracketComponent } from './core/bracket/bracket.component';
import { ScoreboardComponent } from './core/scoreboard/scoreboard.component';

const appRoutes: Routes = [
  { path: '', component: ScoreboardComponent },
  { path: 'bracket', component: BracketComponent },
  { path: 'bracket/:key', component: BracketComponent, children: [
    { path: 'edit', component: BracketComponent }
  ], runGuardsAndResolvers: 'always' }
];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes, { onSameUrlNavigation: 'reload' })
  ],
  exports: [
    RouterModule
  ],
  providers: []
})
export class AppRoutingModule {}
