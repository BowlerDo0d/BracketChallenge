import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { AngularFireModule } from '@angular/fire';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { environment } from 'src/environments/environment';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { NgModule } from '@angular/core';

import { AboutModule } from './modules/about/about.module';
import { AdminModule } from './modules/admin/admin.module';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthModule } from './modules/auth/auth.module';
import { BracketModule } from './modules/bracket/bracket.module';
import { CoreModule } from './core/core.module';
import { HelpModule } from './modules/help/help.module';
import { ProfileModule } from './modules/profile/profile.module';
import { ScoreboardModule } from './modules/scoreboard/scoreboard.module';
import { SharedModule } from './shared/shared.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AngularFireDatabaseModule,
    AppRoutingModule,
    AdminModule,
    AuthModule,
    CoreModule,
    SharedModule,
    ScoreboardModule,
    BracketModule,
    HelpModule,
    AboutModule,
    ProfileModule,
    // Delete these
    MatButtonModule,
    MatSidenavModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
