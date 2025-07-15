import { Component } from '@angular/core';
import { ProductMain } from '../../components/product-main/product-main';
import { Card } from '../../components/card/card';
import { IProduct } from '../../models/product-model';
import { ProductService } from '../../services/product-service';

@Component({
  selector: 'app-plants',
  imports: [ProductMain, Card],
  templateUrl: './plants.html',
  styleUrl: './plants.css',
})
export class Plants {
  plants: IProduct[] = [];
  errorMessage: string = '';

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.productService.getPlants().subscribe({
      next: (data) => {
        this.plants = data;
      },
      error: (err) => {
        this.errorMessage =
          'Failed to fetch plants. Please check the console for details.';
        console.error('Error fetching plants:', err);
      },
    });
  }
}
