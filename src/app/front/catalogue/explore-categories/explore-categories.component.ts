import { Component, AfterViewInit } from '@angular/core';
import Swiper from 'swiper';

@Component({
  selector: 'app-explore-categories',
  templateUrl: './explore-categories.component.html',
  styleUrls: ['./explore-categories.component.css']
})
export class ExploreCategoriesComponent {
  ngAfterViewInit() {
    const mySwiper = new Swiper('.swiper-container', {
      // Optional parameters
      cssMode: false,
      slidesPerView: 6,
      spaceBetween: 30,
      loop: false,
      wrapperClass: 'swiper-wrapper',
  slideClass: 'swiper-slide',

      // Navigation arrows
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },

      // Pagination
      pagination: {
        el: '.swiper-pagination',
        clickable: true,
      },
    });
  }
}
