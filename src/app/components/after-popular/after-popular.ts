import { Component, ElementRef, HostListener, OnInit } from '@angular/core';
import { IProduct } from '../../models/product-model';
import { ProductService } from '../../services/product-service';

@Component({
  selector: 'app-after-popular',
  imports: [],
  standalone: true,
  templateUrl: './after-popular.html',
  styleUrl: './after-popular.css',
})
export class AfterPopular {
  constructor(private el: ElementRef) {}

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
