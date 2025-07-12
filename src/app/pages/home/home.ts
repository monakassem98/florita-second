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
import { ICategory, IProduct } from '../../models/product-model';
import { Card } from '../../components/card/card';
import { Discount } from '../../components/discount/discount';
import { ChooseUs } from '../../components/choose-us/choose-us';
import { Categories } from '../../services/categories';

@Component({
  selector: 'app-home',
  imports: [RouterLink, WhoAreWe, Unique, Card, Discount, ChooseUs],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home implements AfterViewInit, OnDestroy, OnInit {
  constructor(
    private productService: ProductService,
    private el: ElementRef,
    private categoryUrl: Categories
  ) {}

  ngOnInit(): void {
    this.getLatestProducts();
    this.getCategoryData()
  }

  //background image rotation , hero section
  private intervalId: any;
  private backgroundImg: string[] = [
    '../../assets/flower-1.png',
    '../../assets/flower-2.png',
    '../../assets/flower-3.png',
  ];
  ngAfterViewInit(): void {
    this.startImageRotation();
  }

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

  // Method to getting latest products
  products: IProduct[] = [];

  getLatestProducts() {
    this.productService.getAllProducts().subscribe((res: any) => {
      this.products = res.slice(0, 8);
      console.log('Latest products:', this.products);
    });
  }

  // animation and categories section
  category: ICategory[] = [];

  getCategoryData() {
    this.categoryUrl.getCategory().subscribe((res: any) => {
      this.category = res;
      // console.log('category data ::', res);
    });
  }

  isScrolled = false;

  @HostListener('window:scroll', [])
  onWindowScroll() {
    this.checkScroll();
  }

  checkScroll() {
    const componentPosition = this.el.nativeElement.getBoundingClientRect().top;
    // const scrollPosition = window.scrollY;
    const windowHeight = window.innerHeight;

    const triggerPoint = windowHeight * 0.75;

    if (componentPosition < triggerPoint) {
      this.isScrolled = true;
    } else {
      this.isScrolled = false;
    }
  }
}
