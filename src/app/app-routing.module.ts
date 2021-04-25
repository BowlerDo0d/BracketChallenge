import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AboutComponent } from './modules/about/about.component';
import { BracketComponent } from './modules/bracket/bracket.component';
import { BracketsComponent } from './modules/profile/brackets/brackets.component';
import { HelpComponent } from './modules/help/help.component';
import { PreferencesComponent } from './modules/profile/preferences/preferences.component';
import { ProfileComponent } from './modules/profile/profile.component';
import { ScoreboardComponent } from './modules/scoreboard/scoreboard.component';

const routes: Routes = [
  { path: '', redirectTo: '/scoreboard', pathMatch: 'full' },
  { path: 'scoreboard', component: ScoreboardComponent },
  { path: 'bracket', children: [
    { path: '', component: BracketComponent },
    { path: ':key', component: BracketComponent }
  ] },
  { path: 'help', component: HelpComponent },
  { path: 'about', component: AboutComponent },
  { path: 'profile', children: [
    { path: '', component: ProfileComponent },
    { path: 'preferences', component: PreferencesComponent },
    { path: 'my-brackets', component: BracketsComponent }
  ] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
