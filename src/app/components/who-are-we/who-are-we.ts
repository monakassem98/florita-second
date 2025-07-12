import { Component, ElementRef, HostListener } from '@angular/core';

@Component({
  selector: 'app-who-are-we',
  imports: [],
  templateUrl: './who-are-we.html',
  styleUrl: './who-are-we.css',
})
export class WhoAreWe {
  isScrolled = false;

  constructor(private el: ElementRef) {} // Inject ElementRef to get a reference to the host element

  ngOnInit(): void {
    // Initial check in case the user loads the page scrolled down
    this.checkScroll();
  }

  @HostListener('window:scroll', [])
  onWindowScroll() {
    this.checkScroll();
  }

  checkScroll() {
    // Get the position of the component's host element
    const componentPosition = this.el.nativeElement.getBoundingClientRect().top;
    const scrollPosition = window.scrollY;
    const windowHeight = window.innerHeight;

    // Adjust this value based on when you want the animation to trigger.
    // For example, trigger when the component is 200px from the top of the viewport
    // or when the scroll position is past a certain point.
    // I'm using an example where the animation triggers when the top of the component
    // is within 3/4 of the viewport height from the bottom.
    const triggerPoint = windowHeight * 0.75; // Adjust as needed

    if (componentPosition < triggerPoint) {
      this.isScrolled = true;
    } else {
      this.isScrolled = false;
    }

    // Alternatively, if you want to trigger based on a fixed scroll position like 600px:
    // if (window.scrollY > 600) {
    //   this.isScrolled = true;
    // } else {
    //   this.isScrolled = false;
    // }
  }
}
