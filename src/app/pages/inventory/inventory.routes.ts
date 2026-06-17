import { Routes } from '@angular/router';

export const inventoryRoutes: Routes = [
  {
    path: 'inventory',
    loadComponent: () => import( './catalog/catalog' ),
  }
];

export default inventoryRoutes;
