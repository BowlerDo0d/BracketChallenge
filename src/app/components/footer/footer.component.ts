import { AuthService } from '../../services/auth/auth.service';
import { Component, inject, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  standalone: true,
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss'
})
export class FooterComponent implements OnInit {
  authService: AuthService = inject(AuthService);
  currentYear: number = 0;

  ngOnInit(): void {
    this.currentYear = (new Date()).getFullYear();
  }

  isAdmin(): boolean {
    return this.authService.isAdmin();
  }
}
