// src/app/components/card/card.ts
import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { IProduct } from '../../models/product-model';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AddToCart } from '../add-to-cart/add-to-cart';
import { AddToFavs } from '../add-to-favs/add-to-favs';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [CommonModule, AddToCart, AddToFavs],
  templateUrl: './card.html',
  styleUrl: './card.css',
})
export class Card implements OnInit {
  @Input() product!: IProduct;

  constructor(private router: Router) {}

  ngOnInit() {
    console.log(
      'Card Component: Product ID on init:',
      this.product.id,
      'Type:',
      typeof this.product.id
    );
  }

  // product view
  onSelectProductView(productId: any) {
    this.router.navigate([`/products/${productId}`]);
    console.log('product id ::', productId);
  }
}
