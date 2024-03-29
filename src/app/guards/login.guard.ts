import { AuthService } from '../services/auth/auth.service';
import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { map, take } from 'rxjs/operators';

export const loginGuard: CanActivateFn = () => {
  const authService: AuthService = inject(AuthService),
    router: Router = inject(Router);

  return authService.authState$
    .pipe(take(1))
    .pipe(map((user) => {
        if (user) {
          router.navigate(['/']);
        }

        return !user;
      })
    );
};
