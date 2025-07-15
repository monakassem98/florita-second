import { Component } from '@angular/core';
import { ProductMain } from '../../components/product-main/product-main';
import { Card } from '../../components/card/card';
import { IProduct } from '../../models/product-model';
import { ProductService } from '../../services/product-service';

@Component({
  selector: 'app-roses',
  imports: [ProductMain, Card],
  templateUrl: './roses.html',
  styleUrl: './roses.css',
})
export class Roses {
  roses: IProduct[] = [];
  errorMessage: string = '';

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.productService.getRoses().subscribe({
      next: (data) => {
        this.roses = data;
      },
      error: (err) => {
        this.errorMessage =
          'Failed to fetch roses. Please check the console for details.';
        console.error('Error fetching roses:', err);
      },
    });
  }
}
