import { Router, type CanActivateFn } from '@angular/router';
import { AuthService } from '../../pages/marketing/auth/auth.service';
import { inject } from '@angular/core';
import { catchError, map, of } from 'rxjs';

export const tenantCheckGuard: CanActivateFn = (route, state) => {

  const authService = inject(AuthService);
  const router = inject(Router);

  return authService.getUserTenants().pipe(
    map((tenants) => {
      if (tenants && tenants.length > 0) {
        return true;
      } else {
        return router.createUrlTree(['/auth/complete-onboarding']);
      }
    }),
    catchError(() => {
      return of(router.createUrlTree(['/auth/login']));
    })
  );

};
