import { Component, input, Input, OnInit } from '@angular/core';
import { IProduct } from '../../models/product-model';
import { ProductService } from '../../services/product-service';
import { ActivatedRoute, Router } from '@angular/router';
import { AddToCart } from '../add-to-cart/add-to-cart';
import { AddToFavs } from '../add-to-favs/add-to-favs';

@Component({
  selector: 'app-single-product',
  imports: [AddToCart, AddToFavs],
  templateUrl: './single-product.html',
  styleUrl: './single-product.css',
})
export class SingleProduct implements OnInit {
  product!: IProduct;

  @Input() cartFavProduct!: IProduct;

  selectedProductId: string = '';

  formattedComposition: string = '';

  removeCartItem = false;

  constructor(
    private productsService: ProductService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.selectedProductId = this.route.snapshot.paramMap.get('id') || '';
    console.log('OnInit - Selected Product ID:', this.selectedProductId);

    if (this.selectedProductId !== '') {
      this.getData();
    } else {
      console.warn('No product ID found in route parameters.');
      this.formattedComposition = 'No product selected.';
    }
  }

  getData() {
    this.productsService.selectOneProduct(this.selectedProductId).subscribe({
      next: (res: IProduct) => {
        console.log('API Response (res):', res);
        this.product = res;
        this.formatProductComposition();
      },
      error: (err) => {
        console.error('Error fetching product:', err);
        this.formattedComposition = 'Error loading composition.';
      },
      complete: () => {
        console.log('Product data fetch complete.');
      },
    });
  }

  private formatProductComposition(): void {
    if (
      this.product &&
      this.product.composition &&
      this.product.composition.length > 0
    ) {
      this.formattedComposition = this.product.composition
        .map(
          (item) => `<div class="composition-item">
               <span class="name">${item.name}</span> 
               <span class="dots"></span>
               <span class="quantity-unit"> ............................................ ${item.quantity}  ${item.unit}</span>
             </div>`
        )
        .join('');
    } else {
      console.warn(
        'Product or composition is undefined, null, or empty:',
        this.product
      );
      this.formattedComposition = 'No composition details available.';
    }
  }
}
