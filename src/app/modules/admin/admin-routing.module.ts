import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminComponent } from './admin.component';
import { TeamManagerComponent } from './team-manager/team-manager.component';

const routes: Routes = [
  { path: 'admin', component: AdminComponent, children: [
    { path: 'team-manager', component: TeamManagerComponent }
  ] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
