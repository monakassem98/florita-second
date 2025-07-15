import {
  AfterViewInit,
  Component,
  ElementRef,
  HostListener,
  Inject,
  OnInit,
} from '@angular/core';
import * as L from 'leaflet';
import { animate, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'app-map',
  imports: [],
  templateUrl: './map.html',
  styleUrl: './map.css',
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
export class Map implements OnInit, AfterViewInit {
  private observer!: IntersectionObserver;
  animationState: 'void' | 'enter' = 'void';
  private map: L.Map | undefined;
  ngOnInit(): void {
    this.observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            this.animationState = 'enter';
            this.observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.1,
      }
    );
  }

  ngAfterViewInit(): void {
    this.initMap();
  }

  private initMap(): void {
    const mapElement = document.getElementById('leafletMap');
    if (!mapElement) {
      console.error(
        'Map container not found! Make sure <div id="leafletMap"></div> exists in contact.component.html and has a defined height.'
      );
      return;
    }

    this.map = L.map('leafletMap').setView([30.0444, 31.2357], 13);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(this.map);

    L.marker([30.0444, 31.2357])
      .addTo(this.map)
      .bindPopup('<b>Hello there!</b><br>This is Florita.')
      .openPopup();
  }

  ngOnDestroy(): void {
    if (this.observer) {
      this.observer.disconnect();
    }
  }

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
