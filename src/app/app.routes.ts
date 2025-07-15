import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { Fav } from './pages/fav/fav';
import { Cart } from './pages/cart/cart';
import { About } from './pages/about/about';
import { Contact } from './pages/contact/contact';
import { Faq } from './pages/faq/faq';
import { Flowers } from './pages/flowers/flowers';
import { Roses } from './pages/roses/roses';
import { Plants } from './pages/plants/plants';
import { Gifts } from './pages/gifts/gifts';
import { Tulips } from './pages/tulips/tulips';
import { AllProducts } from './pages/all-products/all-products';
import { SingleProduct } from './components/single-product/single-product';
import { UserAuth } from './feature/user-auth/user-auth';

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
  {
    path: 'about',
    component: About,
  },
  {
    path: 'contact',
    component: Contact,
  },

  {
    path: 'faq',
    component: Faq,
  },
  {
    path: 'all-products',
    component: AllProducts,
  },
  {
    path: 'flowers',
    component: Flowers,
  },
  {
    path: 'roses',
    component: Roses,
  },
  {
    path: 'plants',
    component: Plants,
  },
  {
    path: 'gifts',
    component: Gifts,
  },
  {
    path: 'tulips',
    component: Tulips,
  },
  {
    path: 'products/:id',
    component: SingleProduct,
  },
  {
    path: 'user-auth',
    component: UserAuth,
  },
];
