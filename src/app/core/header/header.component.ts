import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';

import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {
  username: string;
  userSubscription: Subscription;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {
    this.userSubscription = this.authService.userChanged.subscribe((user: string) => {
      this.username = user;
    });

    this.username = this.authService.getUsername();
  }

  ngOnDestroy() {
    this.userSubscription.unsubscribe();
  }

  logout() {
    this.authService.logout();
  }
}
