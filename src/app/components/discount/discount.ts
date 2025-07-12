import { Component, ElementRef, HostListener } from '@angular/core';

@Component({
  selector: 'app-discount',
  imports: [],
  templateUrl: './discount.html',
  styleUrl: './discount.css',
})
export class Discount {
  isScrolled = false;

  constructor(private el: ElementRef) {}

  @HostListener('window:scroll', [])
  onWindowScroll() {
    this.checkScroll();
  }

  checkScroll() {
    const componentComposition =
      this.el.nativeElement.getBoundingClientRect().top;
    const windowHeight = window.innerHeight;

    const triggerPoint = windowHeight * 0.75;

    if (componentComposition < triggerPoint) {
      this.isScrolled = true;
    } else {
      this.isScrolled = false;
    }
  }
}
