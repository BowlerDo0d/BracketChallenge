import firebase from 'firebase';
import { AngularFireAuth } from '@angular/fire/auth';
import { indexOf } from 'lodash';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
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
    return this.afAuth.signInWithEmailAndPassword(username, password).then(() => {
      this.afAuth.currentUser.then((user) => {
        this.user = user;
      });
      this.userChanged.next(this.user.email);
      this.setAdmin();
      this.router.navigate(['/']);
    });
  }

  loginWithGoogle() {
    this.afAuth.signInWithRedirect(this.googleProvider);
  }

  logout() {
    this.afAuth.signOut();
    this.user = null;
    this.userChanged.next(null);
    this.router.navigate(['/']);
  }

  registerUser(email: string, password: string) {
    return this.afAuth.createUserWithEmailAndPassword(email, password).then((newUserInfo) => {
      this.user = newUserInfo.user;
      this.userChanged.next(this.user.email);
      this.setAdmin();
      this.router.navigate(['/']);
    });
  }

  setAdmin() {
    this.isAdministrator = indexOf(this.adminUsers, this.getUsername()) !== -1;
  }
}
