import { Component, AfterViewInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CartService } from 'src/app//shared/services/cart.service';
import { GroceriesService } from 'src/app/shared/services/groceries.service';
import { Grocery } from 'src/app/shared/models/grocery.model';



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
