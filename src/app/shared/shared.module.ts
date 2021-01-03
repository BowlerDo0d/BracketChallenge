import { NgModule } from '@angular/core';

import { SvgDefinitionsComponent } from './svg/svg-definitions/svg-definitions.component';
import { SvgIconComponent } from './svg/svg-icon/svg-icon.component';

@NgModule({
  declarations: [
    SvgDefinitionsComponent,
    SvgIconComponent
  ],
  imports: [],
  exports: [SvgDefinitionsComponent, SvgIconComponent]
})
export class SharedModule { }
