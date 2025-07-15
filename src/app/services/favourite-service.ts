import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { IProduct } from '../models/product-model';

@Injectable({
  providedIn: 'root',
})
export class FavouriteService {
  private favouritesSubject = new BehaviorSubject<IProduct[]>(
    this.getFavourites()
  );
  favourites$ = this.favouritesSubject.asObservable();

  getFavourites(): IProduct[] {
    const favourites = JSON.parse(localStorage.getItem('favourites') || '[]');
    console.log(
      'FavouriteService: getFavourites - Type of first product ID in localStorage:',
      favourites.length > 0 ? typeof favourites[0].id : 'N/A'
    );
    return Array.isArray(favourites) ? favourites : [];
  }

  add(product: IProduct) {
    console.log(
      'FavouriteService: add - Type of incoming product.id:',
      typeof product.id
    );
    const favs = this.getFavourites();
    if (!favs.find((p) => p.id === product.id)) {
      favs.push(product);
      localStorage.setItem('favourites', JSON.stringify(favs));
      this.favouritesSubject.next(favs);
    }
  }

  remove(productId: string) {
    let favs = this.getFavourites();
    favs = favs.filter((p) => p.id !== productId);
    localStorage.setItem('favourites', JSON.stringify(favs));
    this.favouritesSubject.next(favs);
  }

  isFavourite(productId: string): boolean {
    console.log(
      'FavouriteService: isFavourite - Type of productId parameter:',
      typeof productId
    );
    return this.getFavourites().some((p) => {
      console.log(
        `Comparing stored ID (${
          p.id
        }, type: ${typeof p.id}) with input ID (${productId}, type: ${typeof productId})`
      );
      return p.id === productId;
    });
  }
}
