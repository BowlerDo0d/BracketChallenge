import { AuthService } from '../../services/auth/auth.service';
import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  private authService: AuthService = inject(AuthService);
  private router: Router = inject(Router);

  isAuthenticated(): boolean {
    return this.authService.isAuthenticated();
  }

  isCheckingForAuth(): boolean {
    return this.authService.isCheckingForAuth();
  }

  logout(): void {
    this.authService.logout();
  }

  get showLoginBtn(): boolean {
    return this.router.url !== '/login';
  }

  get username(): string {
    return this.authService.username;
  }
}
