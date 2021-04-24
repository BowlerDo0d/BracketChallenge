import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { AngularFireModule } from '@angular/fire';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { environment } from 'src/environments/environment';
import { NgModule } from '@angular/core';

import { AboutModule } from './modules/about/about.module';
import { AdminModule } from './modules/admin/admin.module';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthModule } from './modules/auth/auth.module';
import { CoreModule } from './core/core.module';
import { HelpModule } from './modules/help/help.module';
import { ScoreboardModule } from './modules/scoreboard/scoreboard.module';
import { SharedModule } from './shared/shared.module';

import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';

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
    HelpModule,
    AboutModule,
    // Delete these
    MatButtonModule,
    MatSidenavModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
