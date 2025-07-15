import { CommonModule } from '@angular/common';
import {
  AfterViewInit,
  Component,
  ElementRef,
  HostListener,
  Inject,
  OnInit,
  ViewChild,
} from '@angular/core';
import * as L from 'leaflet';
import { animate, style, transition, trigger } from '@angular/animations';
import { Map } from '../../components/map/map';

@Component({
  selector: 'app-contact',
  imports: [CommonModule, Map],
  templateUrl: './contact.html',
  styleUrl: './contact.css',
  animations: [
    trigger('fadeUp', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(0px)' }),
        animate(
          '2s ease-out',
          style({ opacity: 1, transform: 'translateY(0)' })
        ),
      ]),
      transition(':leave', [
        animate(
          '300ms ease-in',
          style({ opacity: 0, transform: 'translateY(20px)' })
        ),
      ]),
    ]),
  ],
})
export class Contact {
  @ViewChild('scrollAnimatedElement') scrollAnimatedElement!: ElementRef;
  animationState: 'void' | 'enter' = 'void';

  private observer!: IntersectionObserver;
  private map: L.Map | undefined;
  constructor(@Inject(ElementRef) public el: ElementRef) {}
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
