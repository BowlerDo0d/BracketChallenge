import { ApplicationConfig } from '@angular/core';
import { authRoutes, routes } from './app.routes';
import { FIREBASE_CONFIG } from './constants/firebase.constants';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { provideRouter, withRouterConfig } from '@angular/router';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(
      [...authRoutes, ...routes],
      withRouterConfig({
        onSameUrlNavigation: 'reload'
      })
    ),
    provideFirebaseApp(() => initializeApp(FIREBASE_CONFIG)),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore())
  ]
};
