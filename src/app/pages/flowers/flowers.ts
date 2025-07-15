import { Component, OnInit } from '@angular/core';
import { ProductMain } from '../../components/product-main/product-main';
import { Card } from '../../components/card/card';
import { IProduct } from '../../models/product-model';
import { ProductService } from '../../services/product-service';

@Component({
  selector: 'app-flowers',
  imports: [ProductMain, Card],
  templateUrl: './flowers.html',
  styleUrl: './flowers.css',
})
export class Flowers implements OnInit{
  flowers: IProduct[] = [];
  errorMessage: string = '';

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.productService.getFlowers().subscribe({
      next: (data) => {
        this.flowers = data;
      },
      error: (err) => {
        this.errorMessage =
          'Failed to fetch flowers. Please check the console for details.';
        console.error('Error fetching flowers:', err);
      },
    });
  }
}
