import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';

import { AuthService } from '../auth/auth.service';

@Injectable()
export class AdminGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): Observable<boolean> | Promise<boolean> | boolean {
    return this.authService.afAuth.authState
      .pipe(take(1))
      .pipe(map((authState) => {
          if (!authState || !this.authService.isAdmin()) {
            this.router.navigate(['/']);
          }

          return !!authState;
        })
      );
  }
}
