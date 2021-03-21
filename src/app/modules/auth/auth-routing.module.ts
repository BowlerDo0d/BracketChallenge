import { AuthComponent } from './auth.component';
import { LoginGuard } from './login-guard.service';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

const authRoutes = [
  { path: 'login', component: AuthComponent, canActivate: [LoginGuard] }
];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(authRoutes)
  ],
  exports: [
    RouterModule
  ],
  providers: [
    LoginGuard
  ]
})
export class AuthRoutingModule {}
