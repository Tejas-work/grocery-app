import { Component, AfterViewInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CartService } from 'src/app/cart.service';
import { GroceriesService } from 'src/app/groceries.service';
import { Grocery } from 'src/app/grocery.model';
import Swiper from 'swiper';


@Component({
  selector: 'app-featured-product',
  templateUrl: './featured-product.component.html',
  styleUrls: ['./featured-product.component.css']
})
export class FeaturedProductComponent {
  categories:string[]=['']
  groceries: Grocery[] = [];

  constructor(private groceriesService:GroceriesService,private cartService: CartService,
    private route: ActivatedRoute,
    private router: Router){

   this.groceries=this.groceriesService.getGroceryList().slice(0,15);
  }

  ngOnInit(){
    this.categories=this.groceriesService.getCategories();
  }
  ngAfterViewInit() {
    const swiper = new Swiper('.swiper-container', {
      slidesPerView: 1,
      spaceBetween: 20,
      breakpoints: {
        576: {
          slidesPerView: 2,
        },
        768: {
          slidesPerView: 3,
        },
        992: {
          slidesPerView: 4,
        },
        1200: {
          slidesPerView: 5,
        },
      },
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
    });
  }



  navigateDetails(id: number) {

    this.router.navigate(['product-details',id]);

  }
  addCart(grocery:Grocery) {
    this.cartService.addItem(1,grocery).subscribe(
      {
        next:(res)=>{
          console.log('addCart',res);
        },
        error:(error)=>{
          console.log(error);
        }
      }
    )
    // this.router.navigate(['cart']);
    }

}
