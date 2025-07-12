import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { IProduct } from '../../models/product-model';
import { ProductService } from '../../services/product-service';
import { FavouriteService } from '../../services/favourite-service';
import { CommonModule, NgClass } from '@angular/common';
import { Subscription } from 'rxjs';
import { CartService } from '../../services/cart-service';

@Component({
  selector: 'app-card',
  imports: [CommonModule, NgClass],
  templateUrl: './card.html',
  styleUrl: './card.css',
})
export class Card implements OnInit, OnDestroy {
  @Input() product!: IProduct;

  // start Favourite
  isFavourite = false;
  @Output() favouriteChanged = new EventEmitter<string>();
  private sub!: Subscription;

  constructor(
    private favService: FavouriteService,
    private cartService: CartService
  ) {}

  ngOnInit() {
    // add to fav
    this.isFavourite = this.favService.isFavourite(this.product.id);
    // this.sub = this.favService.favourites$.subscribe(() => {
    //   this.isFavourite = this.favService.isFavourite(this.product.id);
    // });

    // add to cart
    this.isAddedToCart = this.cartService.isAddedToCart(this.product.id);
    this.sub = this.cartService.cart$.subscribe(() => {
      this.isAddedToCart = this.cartService.isAddedToCart(this.product.id);
    });
  }

  ngOnDestroy() {
    this.sub?.unsubscribe();
  }

  toggleFavourite() {
    if (this.isFavourite) {
      this.favService.remove(this.product.id);
      this.favouriteChanged.emit(this.product.id);
      console.log('added to favs', this.product.id);
    } else {
      this.favService.add(this.product);
      this.favouriteChanged.emit(this.product.id);
      console.log('removed from favs', this.product.id);
    }
    this.isFavourite = !this.isFavourite;
    console.log(this.isFavourite);
  }

  // start add to cart
  @Output() cartChanged = new EventEmitter<string>();
  isAddedToCart: boolean = false;

  toggleCart() {
    if (this.isAddedToCart) {
      this.cartService.removeFromCart(this.product?.id);
      this.cartChanged.emit(this.product.id);
      console.log('removed from cart', this.product.id);
    } else {
      this.cartService.addToCart(this.product);
      this.cartChanged.emit(this.product.id);
      console.log('added to cart', this.product.id);
    }
  }
}
