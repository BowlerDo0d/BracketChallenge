import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HelpComponent } from './modules/help/help.component';
import { ScoreboardComponent } from './modules/scoreboard/scoreboard.component';

const routes: Routes = [
  { path: '', redirectTo: '/scoreboard', pathMatch: 'full' },
  { path: 'scoreboard', component: ScoreboardComponent },
  { path: 'help', component: HelpComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
