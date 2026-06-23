import { Routes } from '@angular/router';

export const inventoryRoutes: Routes = [
  {
    path: 'inventory',
    loadComponent: () => import( './catalog-page/catalog-page' ),
  }
];

export default inventoryRoutes;
