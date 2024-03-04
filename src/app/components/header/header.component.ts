import { AuthService } from '../../auth/auth.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgIf } from '@angular/common';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [NgIf],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit, OnDestroy {
  currentUrl: string = '';
  username: string = '';
  userSubscription: Subscription = new Subscription();

  constructor(private authService: AuthService, private router: Router) {
    this.currentUrl = router.url;
  }

  ngOnInit() {
    this.userSubscription = this.authService.userChanged.subscribe(
      (user: string) => {
        this.username = user;
      }
    );

    this.username = this.authService.getUsername();
  }

  ngOnDestroy() {
    this.userSubscription.unsubscribe();
  }

  isAuthenticated() {
    return this.authService.isAuthenticated();
  }

  isCheckingForAuth() {
    return this.authService.isCheckingForAuth();
  }

  logout() {
    this.authService.logout();
  }
}
