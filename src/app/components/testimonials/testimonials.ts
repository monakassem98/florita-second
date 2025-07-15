import {
  Component,
  ElementRef,
  ViewChild,
  CUSTOM_ELEMENTS_SCHEMA,
  OnInit,
} from '@angular/core';
import { ITestimonial } from '../../models/testimonials-model';
import { SwiperOptions } from 'swiper/types';
import { SwiperContainer } from 'swiper/element';
import { TestimonialService } from '../../services/testimonial-service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-testimonials',
  imports: [CommonModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './testimonials.html',
  styleUrl: './testimonials.css',
})
export class Testimonials implements OnInit {
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
      delay: 2000,
      disableOnInteraction: false,
    },
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

  constructor(private testimonialsService: TestimonialService) {}

  ngOnInit(): void {
    if (this.swiperRef && this.swiperRef.nativeElement) {
      Object.assign(this.swiperRef.nativeElement, this.swiperConfig);
      this.swiperRef.nativeElement.initialize();
    }

    this.getTestimonials();
  }

  getTestimonials() {
    this.testimonialsService.getAllTestimonials().subscribe((res: any) => {
      this.testimonials = res;
      console.log('testimonials ::', res);
    });
  }
} 
