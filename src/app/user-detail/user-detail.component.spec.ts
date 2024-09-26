import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserDetailComponent } from './user-detail.component';
import { RouterModule } from '@angular/router';
import { FirestoreModule, getFirestore, provideFirestore } from '@angular/fire/firestore';
import { FirebaseAppModule, initializeApp, provideFirebaseApp } from '@angular/fire/app';

describe('UserDetailComponent', () => {
  let component: UserDetailComponent;
  let fixture: ComponentFixture<UserDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserDetailComponent, RouterModule.forRoot([]), FirestoreModule, FirebaseAppModule],
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
        provideFirestore(() => getFirestore())
      ],
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UserDetailComponent);
    fixture.detectChanges();
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).to.equal(true);
    // expect(component).toBeTruthy();
  });
});
