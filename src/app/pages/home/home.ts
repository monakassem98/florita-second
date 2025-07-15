import {
  AfterViewInit,
  Component,
  ElementRef,
  HostListener,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { RouterLink } from '@angular/router';
import { WhoAreWe } from '../../components/who-are-we/who-are-we';
import { Unique } from '../../components/unique/unique';
import { ProductService } from '../../services/product-service';
import { IProduct } from '../../models/product-model';
import { Card } from '../../components/card/card';
import { Discount } from '../../components/discount/discount';
import { ChooseUs } from '../../components/choose-us/choose-us';
import { Testimonials } from '../../components/testimonials/testimonials';
import { Popular } from '../../components/popular/popular';
import { AfterPopular } from '../../components/after-popular/after-popular';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    RouterLink,
    WhoAreWe,
    Unique,
    Card,
    Discount,
    ChooseUs,
    Testimonials,

    Popular,
    AfterPopular,
  ],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home implements AfterViewInit, OnDestroy {
  products: IProduct[] = [];

  private intervalId: any;
  private backgroundImg: string[] = [
    '../../assets/flower-1.png',
    '../../assets/flower-2.png',
    '../../assets/flower-3.png',
  ];
  ngAfterViewInit(): void {
    this.startImageRotation();
  }

  constructor(private productService: ProductService) {}

  ngOnDestroy(): void {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }

  private startImageRotation(): void {
    const hero: HTMLElement | null = document.querySelector('.hero');

    if (hero) {
      this.changeImage(hero);

      this.intervalId = setInterval(() => this.changeImage(hero), 5000);
    } else {
      console.warn(
        "Hero element with class '.hero' not found in the template."
      );
    }
  }

  private changeImage(element: HTMLElement): void {
    const i: number = Math.floor(Math.random() * this.backgroundImg.length);
    element.style.backgroundImage = `url('${this.backgroundImg[i]}')`;
  }

  ngOnInit(): void {
    this.getLatestProducts();
  }

  getLatestProducts() {
    this.productService.getAllProducts().subscribe((res: any) => {
      this.products = res.slice(0, 8);
      console.log('Latest products:', this.products);
    });
  }
}
