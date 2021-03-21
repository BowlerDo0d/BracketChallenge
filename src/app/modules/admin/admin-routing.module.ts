import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdminComponent } from './admin.component';
import { AdminGuard } from './admin-guard.service';
import { TeamManagerComponent } from './team-manager/team-manager.component';

const routes: Routes = [
  { path: 'admin', component: AdminComponent, canActivate: [AdminGuard], children: [
    { path: '', pathMatch: 'full', redirectTo: 'team-manager' },
    { path: 'team-manager', component: TeamManagerComponent }
  ] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
