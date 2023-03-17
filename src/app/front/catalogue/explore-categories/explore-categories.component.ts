import { Component, AfterViewInit } from '@angular/core';
import { GroceriesService } from 'src/app/groceries.service';
import { Grocery } from 'src/app/grocery.model';
import Swiper from 'swiper';

@Component({
  selector: 'app-explore-categories',
  templateUrl: './explore-categories.component.html',
  styleUrls: ['./explore-categories.component.css']
})
export class ExploreCategoriesComponent {
  groceries:Grocery[] = [];
  categories: string[] = ['']
 groceryCountByCategory: { [key: string]: number } = {};
  constructor(private groceriesService: GroceriesService) { }

  ngOnInit() {
    //All Categories
    this.groceries = this.groceriesService.getGrocery();
    this.categories = this.groceriesService.getCategories();

    //count groceries by categories
    this.groceryCountByCategory=this.groceriesService.countGroceriesByCategories;
    console.log(typeof(this.groceryCountByCategory));

    console.log(this.groceryCountByCategory);
  }
  //swiper

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
