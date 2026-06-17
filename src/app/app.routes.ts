import { Routes } from '@angular/router';

export const routes: Routes = [

  {
    path: '',
    loadComponent: () => import( './pages/public/landing/landing' )
  },

  {
    path: '',
    loadComponent: () => import( './shared/layouts/auth-layout/auth-layout' ),
    loadChildren: () => import( './pages/public/auth/auth.routes' ),
  },

  {
    path: '**',
    redirectTo: '',
  }
];
