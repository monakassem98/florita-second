import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { CartService } from '../../services/cart-service';
import { IProduct } from '../../models/product-model';
import { MessageService } from 'primeng/api';
import { Toast } from 'primeng/toast';

@Component({
  selector: 'app-add-to-cart',
  imports: [Toast],
  providers: [MessageService],
  templateUrl: './add-to-cart.html',
  styleUrl: './add-to-cart.css',
})
export class AddToCart implements OnInit, OnDestroy {
  @Input() product!: IProduct;

  isAddedToCart: boolean = false;
  private cartSubscription!: Subscription;

  constructor(
    private cartService: CartService,
    private messageService: MessageService
  ) {}

  ngOnInit() {
    this.isAddedToCart = this.cartService.isAddedToCart(this.product.id);

    this.cartSubscription = this.cartService.cart$.subscribe(
      (cartItems: IProduct[]) => {
        this.isAddedToCart = cartItems.some((p) => p.id === this.product.id);
        console.log(
          `Product ${this.product.id} cart status: ${this.isAddedToCart}`
        );
      }
    );
  }

  ngOnDestroy() {
    if (this.cartSubscription) {
      this.cartSubscription.unsubscribe();
    }
  }

  toggleCart() {
    if (this.isAddedToCart) {
      this.cartService.removeFromCart(this.product.id);
      console.log('Removed from cart', this.product.id);
    } else {
      this.cartService.addToCart(this.product);
      console.log('Added to cart', this.product.id);
    }
  }

  // confirmation
  showSuccess() {
    this.messageService.add({
      severity: 'success',
      summary: 'Success',
      detail: 'Product added to cart successfully',
    });
  }

  showWarn() {
    this.messageService.add({
      severity: 'warn',
      summary: 'Warn',
      detail: 'Product removed from cart',
    });
  }
}
