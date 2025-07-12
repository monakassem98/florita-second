import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { IProduct } from '../models/product-model';

@Injectable({
  providedIn: 'root',
})
export class FavouriteService {
  // private favouritesSubject = new BehaviorSubject<IProduct[]>(
  //   this.getFavouritesFromLocalStorage()
  // );

  // favourites$ = this.favouritesSubject.asObservable();

  // getFavouritesFromLocalStorage(): IProduct[] {
  //   return JSON.parse(localStorage.getItem('favourites') || '[]');
  // }

  // setFavuriteToLocalStorage(productId: IProduct) {
  //   const favs = this.getFavouritesFromLocalStorage();
  //   if (!favs.find((p) => p.id === product.id)) {
  //     favs.push(product);
  //     localStorage.setItem('favourites', JSON.stringify(favs));
  //     this.favouritesSubject.next(favs);
  //   }
  // }

  // removeFavouriteFromLocalStorage(productId: string): void {
  //   const favourites = this.getFavouritesFromLocalStorage();
  //   const updatedFavourites = favourites.filter((id) => id !== productId);
  //   localStorage.setItem('favourites', JSON.stringify(updatedFavourites));
  // }

  // isFavourite(productId: string): boolean {
  //   const favourites = this.getFavouritesFromLocalStorage();
  //   return favourites.includes(productId);
  // }

  private favouritesSubject = new BehaviorSubject<IProduct[]>(
    this.getFavourites()
  );
  favourites$ = this.favouritesSubject.asObservable();

  getFavourites(): IProduct[] {
    return JSON.parse(localStorage.getItem('favourites') || '[]');
  }

  add(product: IProduct) {
    const favs = this.getFavourites(); // 1. هات المفضلة الحالية
    if (!favs.find((p) => p.id === product.id)) {
      // 2. شوف المنتج موجود ولا لأ
      favs.push(product); // 3. ضيف المنتج
      localStorage.setItem('favourites', JSON.stringify(favs)); // 4. احفظ في الذاكرة
      this.favouritesSubject.next(favs); // 5. بلغ الكل بالتغيير
    }
  }

  remove(productId: string) {
    let favs = this.getFavourites();
    favs = favs.filter((p) => p.id !== productId);
    localStorage.setItem('favourites', JSON.stringify(favs));
    this.favouritesSubject.next(favs);
  }

  isFavourite(productId: string): boolean {
    return this.getFavourites().some((p) => p.id === productId);
  }
} 
