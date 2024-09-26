import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserComponent } from './user.component';
import { FirestoreModule, getFirestore, provideFirestore } from '@angular/fire/firestore';
import { FirebaseAppModule, initializeApp, provideFirebaseApp } from '@angular/fire/app';

describe('UserComponent', () => {
  let component: UserComponent;
  let fixture: ComponentFixture<UserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserComponent, FirestoreModule, FirebaseAppModule],
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
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).to.equal(true);
    // expect(component).toBeTruthy();
  });
});
