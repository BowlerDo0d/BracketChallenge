import { AuthComponent } from './components/auth/auth/auth.component';
import { loginGuard } from './guards/login.guard';
import { Routes } from '@angular/router';
import { ScoreboardComponent } from './components/scoreboard/scoreboard.component';

export const routes: Routes = [
  { path: '', component: ScoreboardComponent }
];

export const authRoutes: Routes = [
  { path: 'login', component: AuthComponent, canActivate: [loginGuard] }
];
