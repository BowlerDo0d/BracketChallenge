import * as _ from 'lodash';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from 'angularfire2/auth';
import { Subject } from 'rxjs/Subject';
import * as firebase from 'firebase/app';

@Injectable()
export class AuthService {
  adminUsers: Array<string>;
  isAdministrator: boolean;
  checkingForAuth = false;
  googleProvider = new firebase.auth.GoogleAuthProvider();
  user: firebase.User;
  userChanged = new Subject<string>();

  constructor(public afAuth: AngularFireAuth, private router: Router) {
    this.adminUsers = [
      'smahony22@gmail.com',
      'smahony39@gmail.com'
    ];
    this.checkingForAuth = true;

    afAuth.authState.subscribe((user) => {
      this.user = user;

      if (this.user && this.user.email) {
        this.userChanged.next(this.user.email);
        this.setAdmin();
      }

      this.checkingForAuth = false;
    });
  }

  getUsername() {
    return this.user && this.user.email ? this.user.email : '';
  }

  isAdmin() {
    return this.isAdministrator;
  }

  isAuthenticated() {
    return this.user != null;
  }

  isCheckingForAuth() {
    return this.checkingForAuth;
  }

  login(username: string, password: string) {
    return this.afAuth.auth.signInWithEmailAndPassword(username, password).then(() => {
      this.user = this.afAuth.auth.currentUser;
      this.userChanged.next(this.user.email);
      this.setAdmin();
      this.router.navigate(['/']);
    });
  }

  loginWithGoogle() {
    this.afAuth.auth.signInWithRedirect(this.googleProvider);
  }

  logout() {
    this.afAuth.auth.signOut();
    this.user = null;
    this.userChanged.next(null);
    this.router.navigate(['/']);
  }

  registerUser(email: string, password: string) {
    return this.afAuth.auth.createUserWithEmailAndPassword(email, password);
  }

  setAdmin() {
    this.isAdministrator = _.indexOf(this.adminUsers, this.getUsername()) !== -1;
  }
}
