import { Routes } from '@angular/router';
import { PizzaCalculator } from './components/pizza-calculator/pizza-calculator';

export const pizzaRoutes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'calculator',
        component: PizzaCalculator,
      },
    ],
  },
];
