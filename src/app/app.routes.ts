import { AuthComponent } from './components/auth/auth/auth.component';
import { BracketComponent } from './components/bracket/bracket.component';
import { loginGuard } from './guards/login.guard';
import { Routes } from '@angular/router';
import { ScoreboardComponent } from './components/scoreboard/scoreboard.component';

export const routes: Routes = [
  { path: '', component: ScoreboardComponent },
  { path: 'bracket', component: BracketComponent },
  { path: 'bracket/:key', component: BracketComponent, children: [
    { path: 'edit', component: BracketComponent }
  ], runGuardsAndResolvers: 'always' }
];

export const authRoutes: Routes = [
  { path: 'login', component: AuthComponent, canActivate: [loginGuard] }
];
