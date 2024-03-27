import {
  Auth,
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithRedirect,
  User,
  user
} from '@angular/fire/auth';
import { inject, Injectable, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Injectable()
export class AuthService implements OnDestroy {
  private afAuth: Auth = inject(Auth);
  private router: Router = inject(Router);
  private _username: string | null = null;

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
      console.log(authUser);

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

  get username() {
    return this._username;
  }

  isAdmin() {
    return this.isAdministrator;
  }

  isAuthenticated() {
    return this._username != null;
  }

  isCheckingForAuth() {
    return this.checkingForAuth;
  }

  login(username: string, password: string) {
    return signInWithEmailAndPassword(this.afAuth, username, password).then((userCredentials) => {
      this._username = userCredentials.user.email;
      this.setAdmin();
      this.router.navigate(['/']);
    });
  }

  loginWithGoogle() {
    signInWithRedirect(this.afAuth, this.googleProvider);
  }

  logout() {
    this.afAuth.signOut();
    this._username = null;
    this.router.navigate(['/']);
  }

  registerUser(email: string, password: string) {
    return createUserWithEmailAndPassword(this.afAuth, email, password);
  }

  setAdmin() {
    this.isAdministrator = this._username ? this.adminUsers.includes(this._username) : false;
  }
}
