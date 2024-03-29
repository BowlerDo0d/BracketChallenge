import {
  Auth,
  authState,
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
  User,
  user,
  UserCredential
} from '@angular/fire/auth';
import { FirebaseError } from '@angular/fire/app';
import { inject, Injectable, OnDestroy } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class AuthService implements OnDestroy {
  private afAuth: Auth = inject(Auth);
  private router: Router = inject(Router);
  private _username: string = '';

  authState$ = authState(this.afAuth);
  adminUsers: Array<string>;
  isAdministrator: boolean = false;
  checkingForAuth = false;
  googleProvider = new GoogleAuthProvider();
  user$ = user(this.afAuth);
  userSubscription: Subscription;

  constructor() {
    this.adminUsers = [
      'smahony22@gmail.com',
      'smahony39@gmail.com'
    ];
    this.checkingForAuth = true;

    this.userSubscription = this.user$.subscribe((authUser: User | null) => {
      if (authUser?.email) {
        this._username = authUser.email;
        this.setAdmin();
      }

      this.checkingForAuth = false;
    });
  }

  ngOnDestroy(): void {
    this.userSubscription.unsubscribe();
  }

  get authState(): Observable<User | null> {
    return this.authState$;
  }

  isAdmin(): boolean {
    return this.isAdministrator;
  }

  isAuthenticated(): boolean {
    return !!this._username.length;
  }

  isCheckingForAuth(): boolean {
    return this.checkingForAuth;
  }

  login(username: string, password: string): Promise<UserCredential | void> {
    return signInWithEmailAndPassword(this.afAuth, username, password).then((userCredentials) => {
      this._username = userCredentials.user.email ?? '';
      this.setAdmin();
      this.router.navigate(['/']);

      return userCredentials;
    })
    .catch(this.handleError);
  }

  loginWithGoogle(): void {
    signInWithPopup(this.afAuth, this.googleProvider).then(() => {
      this.router.navigate(['/']);
    });
  }

  logout(): void {
    this.afAuth.signOut().then(() => {
      this._username = '';
      this.setAdmin();
      this.router.navigate(['/']);
    });
  }

  registerUser(email: string, password: string): Promise<UserCredential | void> {
    return createUserWithEmailAndPassword(this.afAuth, email, password).then((userCredentials) => {
      this.router.navigate(['/']);

      return userCredentials;
    }).catch(this.handleError);
  }

  setAdmin(): void {
    this.isAdministrator = this._username ? this.adminUsers.includes(this._username) : false;
  }

  get username(): string {
    return this._username;
  }

  private handleError(error: FirebaseError): void {
    let errorMsg = 'Something went wrong.';
    console.log(error.code);

    switch (error.code) {
      case 'auth/configuration-not-found':
        errorMsg = 'Login method not supported';
        break;
      case 'auth/email-already-in-use':
        errorMsg = 'Username already exists';
        break;
      case 'auth/invalid-credential':
        errorMsg = 'Username or password is incorrect';
        break;
      case 'auth/weak-password':
        errorMsg = 'Password is too weak';
        break;
    }

    throw new Error(errorMsg);
  }
}
