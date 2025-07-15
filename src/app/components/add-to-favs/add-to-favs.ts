import { Component, Input } from '@angular/core';
import { Subscription } from 'rxjs';
import { FavouriteService } from '../../services/favourite-service';
import { Router } from '@angular/router';
import { IProduct } from '../../models/product-model';
import { MessageService } from 'primeng/api';
import { Toast } from 'primeng/toast';

@Component({
  selector: 'app-add-to-favs',
  imports: [Toast],
  providers: [MessageService],
  templateUrl: './add-to-favs.html',
  styleUrl: './add-to-favs.css',
})
export class AddToFavs {
  @Input() product!: IProduct;

  isFavourite = false;
  private favouriteSubscription!: Subscription;

  constructor(
    private favService: FavouriteService,
    private router: Router,
    private messageService: MessageService
  ) {}
  ngOnInit() {
    console.log(
      'Card Component: Product ID on init:',
      this.product.id,
      'Type:',
      typeof this.product.id
    );
    this.favouriteSubscription = this.favService.favourites$.subscribe(
      (favourites: IProduct[]) => {
        if (favourites.length > 0) {
          console.log(
            'Card Component: Favourites array updated. First item ID type:',
            typeof favourites[0].id
          );
        }
        this.isFavourite = favourites.some((p) => p.id === this.product.id);
        console.log(
          `Card Component: isFavourite updated to ${this.isFavourite} for product ID ${this.product.id}`
        );
      }
    );
  }

  ngOnDestroy() {
    if (this.favouriteSubscription) {
      this.favouriteSubscription.unsubscribe();
    }
  }

  toggleFavourite() {
    console.log(
      'Card Component: Toggling favourite for product ID:',
      this.product.id,
      'Type:',
      typeof this.product.id
    );
    if (this.isFavourite) {
      this.favService.remove(this.product.id);
    } else {
      this.favService.add(this.product);
    }
  }

  // confirmation
  showSuccess() {
    this.messageService.add({
      severity: 'success',
      summary: 'Success',
      detail: 'Product added to favourites successfully',
    });
  }

  showWarn() {
    this.messageService.add({
      severity: 'warn',
      summary: 'Warn',
      detail: 'Product removed from favourites',
    });
  }
}
