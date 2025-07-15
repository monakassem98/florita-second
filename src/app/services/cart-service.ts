import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { IProduct } from '../models/product-model';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  cartData = new BehaviorSubject<number>(0);

  constructor() {
    this.loadCartInitialData();
  }

  cartSubject = new BehaviorSubject<IProduct[]>(this.getCart());
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
    this.updateCartNumber(cartList);
  }

  removeFromCart(productId: string) {
    let cartList = this.getCart();
    cartList = cartList.filter((p) => p.id !== productId);
    localStorage.setItem('cart', JSON.stringify(cartList));
    this.cartSubject.next(cartList);
    this.updateCartNumber(cartList);
  }

  isAddedToCart(productId: string): boolean {
    return this.getCart().some((p) => p.id === productId);
  }

  updateCartNumber(cartItems: IProduct[] | []) {
    this.cartData.next(cartItems.length);
    localStorage.setItem('cart', JSON.stringify(cartItems));
  }

  private loadCartInitialData() {
    let cart = localStorage.getItem('cart');
    if (cart) {
      this.cartData.next(JSON.parse(cart).length);
    }
  }
}
