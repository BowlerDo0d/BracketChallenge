import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppRoutingModule } from '../app-routing.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [

  ],
  imports: [
    AppRoutingModule,
    CommonModule,
    NgbModule
  ],
  exports: [
    AppRoutingModule
  ]
})
export class CoreModule { }
