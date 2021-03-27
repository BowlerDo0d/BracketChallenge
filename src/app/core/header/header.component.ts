import { AuthService } from 'src/app/modules/auth/auth.service';
import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { MatIconRegistry } from '@angular/material/icon';
import { Subscription } from 'rxjs';

@Component({
  selector: 'bkc-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent implements OnInit, OnDestroy {
  username: string;
  userSubscription: Subscription;

  constructor(
    private authService: AuthService,
    private matIconRegistry: MatIconRegistry,
    private domSanitizer: DomSanitizer
  ) {
    this.matIconRegistry.addSvgIcon(
      'bracket',
      this.domSanitizer.bypassSecurityTrustResourceUrl('../../../assets/bracket.svg')
    );
  }

  ngOnInit(): void {
    this.userSubscription = this.authService.userChanged.subscribe((user: string) => {
      this.username = user;
    });

    this.username = this.authService.getUsername();
  }

  ngOnDestroy() {
    this.userSubscription.unsubscribe();
  }

  isAdmin() {
    return this.authService.isAdmin();
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
