import { Component, OnInit, signal } from '@angular/core';
import { ProductService } from '../../services/product-service';
import { IProduct } from '../../models/product-model';
import { Card } from "../../components/card/card";
import { ProductMain } from "../../components/product-main/product-main";

@Component({
  selector: 'app-all-products',
  imports: [Card, ProductMain],
  templateUrl: './all-products.html',
  styleUrl: './all-products.css',
})
export class AllProducts implements OnInit {
  // products: IProduct[] = [];

  products = signal<IProduct[]>([]);

  constructor(private productService: ProductService) {}

  ngOnInit() {
    this.getAllProducts();
  }

  getAllProducts() {
    this.productService.getAllProducts().subscribe((res: any) => {
      this.products.set(res);
    });
  }
}
