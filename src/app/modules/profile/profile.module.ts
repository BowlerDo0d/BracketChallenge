import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BracketsComponent } from './brackets/brackets.component';
import { PreferencesComponent } from './preferences/preferences.component';
import { ProfileComponent } from './profile.component';

@NgModule({
  declarations: [
    BracketsComponent,
    PreferencesComponent,
    ProfileComponent
  ],
  imports: [
    CommonModule
  ]
})
export class ProfileModule { }
