import { Component, ElementRef, HostListener, OnInit } from '@angular/core';
import { Categories } from '../../services/categories';
import { ICategory } from '../../models/product-model';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-popular',
  imports: [RouterLink],
  templateUrl: './popular.html',
  styleUrl: './popular.css',
})
export class Popular implements OnInit {
  constructor(private categoryUrl: Categories, private el: ElementRef) {}

  ngOnInit(): void {
    this.getCategoryData();
  }

  category: ICategory[] = [];

  getCategoryData() {
    this.categoryUrl.getCategory().subscribe((res: any) => {
      this.category = res;
    });
  }

  isScrolled = false;

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
