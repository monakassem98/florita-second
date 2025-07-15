import { Component, OnDestroy, OnInit } from '@angular/core';
import { Card } from '../../components/card/card';
import { IProduct } from '../../models/product-model';
import { ProductMain } from '../../components/product-main/product-main';
import { Subscription } from 'rxjs';
import { CartService } from '../../services/cart-service';

@Component({
  selector: 'app-cart',
  imports: [Card, ProductMain],
  templateUrl: './cart.html',
  styleUrl: './cart.css',
})
export class Cart implements OnInit, OnDestroy {
  product: IProduct[] = [];
  private cartSubscription!: Subscription;

  constructor(private cartService: CartService) {}

  ngOnInit() {
    this.cartSubscription = this.cartService.cart$.subscribe(
      (items: IProduct[]) => {
        this.product = items;
        console.log(
          'Cart component: received updated cart items',
          this.product
        );
      }
    );
  }

  ngOnDestroy() {
    if (this.cartSubscription) {
      this.cartSubscription.unsubscribe();
    }
  }
}
