import { Component, ElementRef, HostListener } from '@angular/core';

@Component({
  selector: 'app-choose-us',
  imports: [],
  templateUrl: './choose-us.html',
  styleUrl: './choose-us.css',
})
export class ChooseUs {
  isScrolled = false;

  constructor(private el: ElementRef) {}

  @HostListener('window:scroll', [])
  onWindowScroll() {
    this.checkScroll();
  }

  checkScroll() {
    const componentPosition = this.el.nativeElement.getBoundingClientRect().top;
    const windowHeight = window.innerHeight;

    const triggerPoint = windowHeight * 0.75;

    if (componentPosition < triggerPoint) {
      this.isScrolled = true;
    } else {
      this.isScrolled = false;
    }
  }
}
