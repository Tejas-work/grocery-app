import { Component, AfterViewInit } from '@angular/core';
import { GroceriesService } from 'src/app/groceries.service';
import Swiper from 'swiper';

@Component({
  selector: 'app-explore-categories',
  templateUrl: './explore-categories.component.html',
  styleUrls: ['./explore-categories.component.css']
})
export class ExploreCategoriesComponent {
  categories:string[]=['']
  constructor(private groceriesService:GroceriesService){}

  ngOnInit(){
    this.categories=this.groceriesService.getCategories();
  }
  ngAfterViewInit() {
    const mySwiper = new Swiper('.swiper-container', {
      // Optional parameters

      slidesPerView: 5,
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
