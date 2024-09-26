import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogEditUserComponent } from './dialog-edit-user.component';
import { FirestoreModule, getFirestore, provideFirestore } from '@angular/fire/firestore';
import { FirebaseAppModule, initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { MatDialogRef } from '@angular/material/dialog';
import { provideAnimations } from '@angular/platform-browser/animations';

describe('DialogEditUserComponent', () => {
  let component: DialogEditUserComponent;
  let fixture: ComponentFixture<DialogEditUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DialogEditUserComponent, FirestoreModule, FirebaseAppModule],
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
        {provide: MatDialogRef, useValue: {}},
        provideAnimations()
      ],
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DialogEditUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).to.equal(true);
    // expect(component).toBeTruthy();
  });
});
