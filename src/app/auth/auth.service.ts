import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from 'angularfire2/auth';
import { Subject } from 'rxjs/Subject';
import * as firebase from 'firebase/app';

@Injectable()
export class AuthService {
  user: firebase.User;
  userChanged = new Subject<string>();

  constructor(public afAuth: AngularFireAuth, private router: Router) {
    afAuth.authState.subscribe((user) => {
      this.user = user;

      if (this.user && this.user.email) {
        this.userChanged.next(this.user.email);
      }
    });
  }

  getUsername() {
    return this.user && this.user.email ? this.user.email : '';
  }

  isAuthenticated() {
    return this.user != null;
  }

  login(username: string, password: string) {
    return this.afAuth.auth.signInWithEmailAndPassword(username, password).then(() => {
      this.user = this.afAuth.auth.currentUser;
      this.userChanged.next(this.user.email);
      this.router.navigate(['/']);
    });
  }

  logout() {
    this.afAuth.auth.signOut();
    this.user = null;
    this.userChanged.next(null);
  }

  registerUser(email: string, password: string) {
    return this.afAuth.auth.createUserWithEmailAndPassword(email, password);
  }
}
