import { Component, Input, OnInit } from '@angular/core';
import { IProduct } from '../../models/product-model';
import { Card } from '../../components/card/card';

@Component({
  selector: 'app-fav',
  imports: [Card],
  templateUrl: './fav.html',
  styleUrl: './fav.css',
})
export class Fav implements OnInit {
  product: IProduct[] = [];

  ngOnInit() {
    this.loadFavourites();
  }

  loadFavourites() {
    const favs = localStorage.getItem('favourites');
    this.product = favs ? JSON.parse(favs) : [];
    console.log(this.product);
    
  }
}
