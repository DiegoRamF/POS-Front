import { Routes } from '@angular/router';

export const routes: Routes = [

  {
    path: '',
    loadComponent: () => import( './pages/marketing/landing/landing' )
  },

  {
    path: '',
    loadComponent: () => import( './shared/layouts/auth-layout/auth-layout' ),
    loadChildren: () => import( './pages/marketing/auth/auth.routes' ),
  },

  {
    path: '',
    loadComponent: () => import( './shared/layouts/main-layout/main-layout' ),
    children: [
      {
        path: '',
        loadChildren: () => import( './pages/inventory/inventory.routes' ),
      },
      {
        path: 'admin',
        loadComponent: () => import( './pages/admin/dashboard/dashboard' )
      }
    ]
  },

  {
    path: '**',
    redirectTo: '',
  }
];
