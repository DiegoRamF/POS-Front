import { Routes } from '@angular/router';

export const authRoutes: Routes = [
  {
    path: 'login',
    loadComponent: () => import( './login-page/login-page' ),
  },
  {
    path: 'register',
    loadComponent: () => import( './register-page/register-page' )
  },
  {
    path: 'select-role',
    loadComponent: () => import( './select-role/select-role' ),
  },
  {
    path: 'complete-onboarding',
    loadComponent: () => import( './complete-onboarding/complete-onboarding' ),
  }
];

export default authRoutes;
