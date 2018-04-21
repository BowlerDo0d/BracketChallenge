import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdminComponent } from './admin.component';
import { AdminGuard } from './admin-guard.service';
import { ResultsComponent } from './results/results.component';

const adminRoutes = [
  { path: 'admin', component: AdminComponent, canActivate: [AdminGuard] },
  { path: 'admin/results', component: ResultsComponent, canActivate: [AdminGuard] }
];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(adminRoutes)
  ],
  exports: [
    RouterModule
  ],
  providers: [
    AdminGuard
  ]
})
export class AdminRoutingModule {}
