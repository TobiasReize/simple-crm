import { TestBed } from '@angular/core/testing';

import { FirebaseService } from './firebase.service';
import { FirestoreModule, getFirestore, provideFirestore } from '@angular/fire/firestore';
import { FirebaseAppModule, initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../../environments/environment.development';

describe('FirebaseService', () => {
  let service: FirebaseService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [FirestoreModule, FirebaseAppModule],
      providers: [
        provideFirebaseApp(() =>
          initializeApp(environment.firebaseConfig)
        ),
        provideFirestore(() => getFirestore()),
      ],
    });
    service = TestBed.inject(FirebaseService);
  });

  it('should be created', () => {
    expect(service).to.equal(true);
    // expect(service).toBeTruthy();
  });
});
