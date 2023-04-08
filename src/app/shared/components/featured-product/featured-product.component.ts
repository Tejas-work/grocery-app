import { Component, AfterViewInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CartService } from 'src/app//shared/services/cart.service';
import { GroceriesService } from 'src/app/shared/services/groceries.service';
import { Grocery } from 'src/app/shared/models/grocery.model';
import { ToastrService } from 'ngx-toastr';
import { ProductsService } from '../../services/products.service';
import { Category } from '../../models/category.model';



@Component({
  selector: 'app-featured-product',
  templateUrl: './featured-product.component.html',
  styleUrls: ['./featured-product.component.css']
})
export class FeaturedProductComponent {
  categories:Category[]=[]
  groceries: Grocery[] = [];

  constructor(private groceriesService:GroceriesService,private cartService: CartService,
    private route: ActivatedRoute,private toastr: ToastrService,
    private router: Router,private productService:ProductsService){

   this.groceries=this.groceriesService.getGroceryList().slice(0,15);
   this.getAllCategories();
  }

  ngOnInit(){

  }
  ngAfterViewInit() {

  }

  getAllCategories(){
    this.productService.getAllCategories().subscribe(
      {
        next:(res)=>{
          this.categories=res.data;
          console.log(this.categories);

        }
      }
    );
  }

  navigateDetails(id: number) {

    this.router.navigate(['product-details', id,'All']);

  }
  addCart(grocery:Grocery) {
    // this.cartService.addItem(1,grocery).subscribe(
    //   {
    //     next:(res)=>{
    //       console.log('addCart',res);
    //     },
    //     error:(error)=>{
    //       console.log(error);

    //       if(error.status==0){
    //         this.toastr.error('Server problem. Please contact the authorized person.');
    //       }
    //       if(error.status==500){
    //         this.toastr.info('Item added to cart successfully');

    //       }
    //     }
    //   }
    // )
    // this.router.navigate(['cart']);
    }

}
