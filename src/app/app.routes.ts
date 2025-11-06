import { Routes } from '@angular/router';
import { MainLayout } from './core/layout/components/main-layout/main-layout';

export const routes: Routes = [
  {
    path: '',
    component: MainLayout,
    children: [
      {
        path: 'pizza',
        loadChildren: () =>
          import('./features/pizza/pizza.routes').then((m) => m.pizzaRoutes),
      },
    ],
  },
];
