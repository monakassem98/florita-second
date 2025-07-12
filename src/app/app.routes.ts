import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { Fav } from './pages/fav/fav';
import { Cart } from './pages/cart/cart';

export const routes: Routes = [
  {
    path: 'home',
    component: Home,
  },
  {
    path: 'favourites',
    component: Fav,
  },
  {
    path: 'cart',
    component: Cart,
  },
];
