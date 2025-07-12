import { Component } from '@angular/core';
import { Card } from '../../components/card/card';
import { IProduct } from '../../models/product-model';

@Component({
  selector: 'app-cart',
  imports: [Card],
  templateUrl: './cart.html',
  styleUrl: './cart.css',
})
export class Cart {
  product: IProduct[] = [];

  ngOnInit() {
    this.loadFavourites();
  }

  loadFavourites() {
    const cart = localStorage.getItem('cart');
    this.product = cart ? JSON.parse(cart) : [];
    console.log(this.product);
  }
}
