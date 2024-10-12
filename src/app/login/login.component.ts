import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Auth, authState, createUserWithEmailAndPassword, getAuth, idToken, sendPasswordResetEmail, signInWithEmailAndPassword, signOut, User, user } from '@angular/fire/auth';
import { FormsModule, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  loginData = {
    email: '',
    password: ''
  }

  currentUser!: User | null;

  private auth = inject(Auth);

  user$ = user(this.auth);
  userSubscription: Subscription;

  authState$ = authState(this.auth);
  authStateSubscription: Subscription;

  idToken$ = idToken(this.auth);
  idTokenSubscription: Subscription;


  constructor(private router: Router) {
    this.userSubscription = this.user$.subscribe((aUser: User | null) => {
      //handle user state changes here. Note, that user will be null if there is no currently logged in user.
      console.log('User subscription:', aUser);
      this.currentUser = aUser;
    });

    this.authStateSubscription = this.authState$.subscribe((aUser: User | null) => {
      //handle auth state changes here. Note, that user will be null if there is no currently logged in user.
      // console.log('AuthState Subscription:', aUser);
    });

    this.idTokenSubscription = this.idToken$.subscribe((token: string | null) => {
      //handle idToken changes here. Note, that user will be null if there is no currently logged in user.
      // console.log('idToken Subscription:', token);
    });
  }


  ngOnDestroy() {
    // when manually subscribing to an observable remember to unsubscribe in ngOnDestroy
    this.userSubscription.unsubscribe();
    this.authStateSubscription.unsubscribe();
    this.idTokenSubscription.unsubscribe();
  }


  onSubmit(ngForm: NgForm) {
    if (ngForm.submitted && ngForm.form.valid) {
      console.log(this.loginData);
      // this.router.navigateByUrl('/dashboard');
      // this.registerUser();
      // this.signOutUser();
      this.signInUser();

      // this.currentUser?.delete();
      ngForm.resetForm();
    }
  }


  registerUser() {
    const auth = getAuth();
      createUserWithEmailAndPassword(auth, this.loginData.email, this.loginData.password)
        .then((userCredential) => {
          // Signed up 
          const user = userCredential.user;
          console.log('Registrierung erfolgreich!', user);
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          console.log('Error-Code:', errorCode);
          console.log('Error-Message:', errorMessage);
        });
  }


  signInUser() {
    const auth = getAuth();
    signInWithEmailAndPassword(auth, this.loginData.email, this.loginData.password)
      .then((userCredential) => {
        // Signed in 
        const user = userCredential.user;
        console.log('Anmeldung erfolgreich!', user);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log('Error-Code:', errorCode);
        console.log('Error-Message:', errorMessage);
      });
  }


  signOutUser() {
    const auth = getAuth();
    signOut(auth).then(() => {
      // Sign-out successful.
      console.log('User ausgeloggt');
    }).catch((error) => {
      // An error happened.
      console.log('Error:', error);
    });
  }


  resetPassword() {
    const auth = getAuth();
    sendPasswordResetEmail(auth, this.loginData.email)
      .then(() => {
        // Password reset email sent!
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log('Error-Code:', errorCode);
        console.log('Error-Message:', errorMessage);
      });
  }


  confirmPasswordReset(auth: Auth, oobCode: string, newPassword: string) {
    //
  }


}