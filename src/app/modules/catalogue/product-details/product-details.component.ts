import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CartService } from 'src/app//shared/services/cart.service';
import { GroceriesService } from 'src/app/shared/services/groceries.service';
import { Grocery } from 'src/app/shared/models/grocery.model';
@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent {
goCart() {
  this.router.navigate(['cart']);
}



  grocery: Grocery = {
    id: 0,
    grocery_name: '',
    store: '',
    price: 0,
    rating: 0,
    quantity: '',
    category: '',
    imageUrl: ''
  }

  addedInCartItem: any[] = [];
  checkCart=true;

  quantityCount: Number = 1;
  button_text = "Add Cart";
  add=true;

  constructor(
    private groceriesService: GroceriesService,
    private cartService: CartService,
    private route: ActivatedRoute,
    private router: Router
  ) {

    this.cartService.items$.subscribe({
      next: (res) => {
        this.addedInCartItem = res.map((item) => item.id);
        console.log("details",this.addedInCartItem);
      },
      error: (error) => console.log(error)
    });
   }

  async ngOnInit() {
    window.scrollTo(0, 0);
    this.route.params.subscribe((param) => {
      let check = this.groceriesService.getGrocery(Number(param['id']))
      if (check) {
        this.grocery = check;
      }

    });
  }



  addCart() {
    console.log(this.quantityCount);

    this.cartService.addItem(this.quantityCount, this.grocery).subscribe(
      {
        next: (res) => {
          console.log('addCart', res);

        },
        error: (error) => {
          console.log(error);
        }
      }
    )

    this.router.navigate(['cart']);
  }


  checkInCart(id:number){
    this.checkCart= this.addedInCartItem.includes(id);
    return this.checkCart;
  }

}
