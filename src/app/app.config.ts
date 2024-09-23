import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideAnimationsAsync(),
    provideFirebaseApp(() =>
      initializeApp({
        projectId: 'simple-crm-62c29',
        appId: '1:402481278630:web:ebdfa1170c0d2139d2ce67',
        storageBucket: 'simple-crm-62c29.appspot.com',
        apiKey: 'AIzaSyCDAvVgG0EYfGvSQNk4asIBgniwIFPdgf4',
        authDomain: 'simple-crm-62c29.firebaseapp.com',
        messagingSenderId: '402481278630',
      })
    ),
    provideFirestore(() => getFirestore()),
  ],
};
