import { Component, OnInit, inject } from '@angular/core';
import { AuthService } from '../../auth/auth.service';

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
