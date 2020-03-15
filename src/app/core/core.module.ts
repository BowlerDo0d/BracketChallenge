import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { CoreRoutingModule } from './core-routing.module';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { SvgDefinitionsComponent } from './svg/svg-definitions/svg-definitions.component';
import { SvgIconComponent } from './svg/svg-icon/svg-icon.component';

@NgModule({
  declarations: [
    FooterComponent,
    HeaderComponent,
    SvgDefinitionsComponent,
    SvgIconComponent
  ],
  imports: [
    CommonModule,
    CoreRoutingModule
  ],
  exports: [SvgDefinitionsComponent, SvgIconComponent]
})
export class CoreModule { }
