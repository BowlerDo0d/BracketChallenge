import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  userChanged: Subject<string> = new Subject<string>();

  constructor() {}

  getUsername(): string {
    return 'fake';
  }

  isAdmin(): boolean {
    return true;
  }

  isAuthenticated(): boolean {
    return true;
  }

  isCheckingForAuth(): boolean {
    return false;
  }

  logout(): void {}
}
