import {
  AfterViewInit,
  Component,
  ElementRef,
  HostListener,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { RouterLink } from '@angular/router';
import { WhoAreWe } from '../../components/who-are-we/who-are-we';
import { Unique } from '../../components/unique/unique';
import { ProductService } from '../../services/product-service';
import { TestimonialService } from '../../services/testimonial-service';
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
    private categoryUrl: Categories,
    private testimonialService: TestimonialService
  ) {}

  ngOnInit(): void {
    this.getLatestProducts();
    this.getCategoryData();

    if (this.swiperRef && this.swiperRef.nativeElement) {
      Object.assign(this.swiperRef.nativeElement, this.swiperConfig);
      this.swiperRef.nativeElement.initialize();
    }

    this.getTestimonials();
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

  // start testimonials

  @ViewChild('swiperRef', { static: true })
  swiperRef!: ElementRef<SwiperContainer>;

  testimonials!: ITestimonial[];

  swiperConfig: SwiperOptions = {
    slidesPerView: 1,
    spaceBetween: 30,
    loop: true,
    pagination: {
      clickable: true,
    },
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
    autoplay: {
      delay: 5000, // 5 seconds
      disableOnInteraction: false,
    },
    // Add breakpoints for responsiveness
    breakpoints: {
      768: {
        slidesPerView: 2,
        spaceBetween: 40,
      },
      1024: {
        slidesPerView: 3,
        spaceBetween: 50,
      },
    },
  };



  getTestimonials() {
    this.testimonialService.getAllTestimonials().subscribe((res: any) => {
      this.testimonials = res;
      console.log('testimonials ::', res);
    });
  }
  // Optional: Listen to Swiper events
  onSlideChange(swiper: any) {
    console.log('slide changed', swiper);
  }
}
