import { TestBed } from '@angular/core/testing';

import { FirebaseService } from './firebase.service';
import { FirestoreModule, getFirestore, provideFirestore } from '@angular/fire/firestore';
import { FirebaseAppModule, initializeApp, provideFirebaseApp } from '@angular/fire/app';

describe('FirebaseService', () => {
  let service: FirebaseService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [FirestoreModule, FirebaseAppModule],
      providers: [
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
    });
    service = TestBed.inject(FirebaseService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
