import { Component } from '@angular/core';
import { ProductMain } from '../../components/product-main/product-main';
import { Card } from '../../components/card/card';
import { IProduct } from '../../models/product-model';
import { ProductService } from '../../services/product-service';

@Component({
  selector: 'app-tulips',
  imports: [ProductMain, Card],
  templateUrl: './tulips.html',
  styleUrl: './tulips.css',
})
export class Tulips {
  tulips: IProduct[] = [];
  errorMessage: string = '';

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.productService.getTulips().subscribe({
      next: (data) => {
        this.tulips = data;
      },
      error: (err) => {
        this.errorMessage =
          'Failed to fetch tulips. Please check the console for details.';
        console.error('Error fetching tulips:', err);
      },
    });
  }
}
