import { Routes } from '@angular/router';

export const authRoutes: Routes = [
  {
    path: 'auth',
    loadComponent: () => import( './login/login' ),
  },
  {
    path: 'select-role',
    loadComponent: () => import( './select-role/select-role' ),
  },
];

export default authRoutes;
