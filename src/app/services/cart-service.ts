import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { IProduct } from '../models/product-model';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private cartSubject = new BehaviorSubject<IProduct[]>(this.getCart());
  cart$ = this.cartSubject.asObservable();

  getCart(): IProduct[] {
    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    return Array.isArray(cart) ? cart : [];
  }

  addToCart(product: IProduct) {
    const cartList = this.getCart();
    if (!cartList.find((p) => p.id === product.id)) {
      cartList.push(product);
      localStorage.setItem('cart', JSON.stringify(cartList));
      this.cartSubject.next(cartList);
    }
  }

  removeFromCart(productId: string) {
    let cartList = this.getCart();
    cartList = cartList.filter((p) => p.id !== productId);
    localStorage.setItem('cart', JSON.stringify(cartList));
    this.cartSubject.next(cartList);
  }

  isAddedToCart(productId: string): boolean {
    return this.getCart().some((p) => p.id === productId);
  }
}
