import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { IProduct } from '../../models/product-model';
import { Card } from '../../components/card/card';
import { ProductMain } from '../../components/product-main/product-main';
import { Subscription } from 'rxjs';
import { FavouriteService } from '../../services/favourite-service';

@Component({
  selector: 'app-fav',
  imports: [Card, ProductMain],
  templateUrl: './fav.html',
  styleUrl: './fav.css',
})
export class Fav implements OnInit, OnDestroy {
  product: IProduct[] = [];
  private favSubscription!: Subscription;

  constructor(private favService: FavouriteService) {}

  ngOnInit() {
    this.favSubscription = this.favService.favourites$.subscribe(
      (items: IProduct[]) => {
        this.product = items;
        console.log('Fav component: received updated fav items', this.product);
      }
    );
  }

  ngOnDestroy() {
    if (this.favSubscription) {
      this.favSubscription.unsubscribe();
    }
  }
}
