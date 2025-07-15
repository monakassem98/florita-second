import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product-service';
import { IProduct } from '../../models/product-model';
import { ProductMain } from "../../components/product-main/product-main";
import { Card } from "../../components/card/card";

@Component({
  selector: 'app-gifts',
  imports: [ProductMain, Card],
  templateUrl: './gifts.html',
  styleUrl: './gifts.css',
})
export class Gifts implements OnInit {
  gifts: IProduct[] = [];

  errorMessage: string = '';

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.productService.getGifts().subscribe({
      next: (data) => {
        this.gifts = data;
      },
      error: (err) => {
        this.errorMessage =
          'Failed to fetch gifts. Please check the console for details.';
        console.error('Error fetching gifts:', err);
      },
    });
  }
}
