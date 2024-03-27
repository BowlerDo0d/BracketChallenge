import { AuthService } from '../../auth/auth.service';
import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  private authService: AuthService = inject(AuthService);
  private router: Router = inject(Router);

  currentUrl: string = '';
  username: string | null = null;

  constructor() {
    this.currentUrl = this.router.url;
    this.username = this.authService.username;
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
