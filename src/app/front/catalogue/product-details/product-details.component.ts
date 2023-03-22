import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CartService } from 'src/app/cart.service';
import { GroceriesService } from 'src/app/groceries.service';
import { Grocery } from 'src/app/grocery.model';
@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent {



  grocery:Grocery = {
    id: 0,
    grocery_name: '',
    store: '',
    price: 0,
    rating: 0,
    quantity: '',
    category: '',
    imageUrl: ''
  }

  quantityCount:number=1;

  constructor(
    private groceriesService: GroceriesService,
    private cartService: CartService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(){

    this.route.params.subscribe((param)=>{
      let check = this.groceriesService.getGrocery(Number(param['id']))
      if(check){
        this.grocery=check;
      }

    })

  }

  increase() {
    this.quantityCount++;
    }
    decrease() {
      if(this.quantityCount>0){
        this.quantityCount--;

      }

    }

  addCart() {
    this.cartService.addItem(this.quantityCount,this.grocery).subscribe(
      {
        next:(res)=>{
          console.log('addCart',res);
        },
        error:(error)=>{
          console.log(error);
        }
      }
    )
    this.router.navigate(['cart']);
    }


}
