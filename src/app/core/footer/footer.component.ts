import { Component } from '@angular/core';

import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent {
  public currentYear: number;

  constructor(private authService: AuthService) {
    this.currentYear = (new Date()).getFullYear();
  }

  isAdmin() {
    return this.authService.isAdmin();
  }
}
