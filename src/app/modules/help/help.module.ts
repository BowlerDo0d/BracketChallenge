import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';

import { HelpComponent } from './help.component';

@NgModule({
  declarations: [HelpComponent],
  imports: [
    CommonModule,
    MatTableModule
  ]
})
export class HelpModule { }
