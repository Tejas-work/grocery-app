import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CartService } from 'src/app/cart.service';
import { CartItem } from 'src/app/cartItem.model';
import { GroceriesService } from 'src/app/groceries.service';
import { Grocery } from 'src/app/grocery.model';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent {



  items: CartItem[] = [];

  subTotal: number = 0;
  gst: number = 0;
  total: number = 0;


  constructor(
    private groceriesService: GroceriesService,
    private cartService: CartService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    window.scrollTo(0, 0);

    this.getCartItems();
    this.getCalculation()


  }


  getCartItems() {
    this.cartService.getItems().subscribe({
      next: (res) => {
        this.items = res;

      }, error: (error) => {
        console.error(error);
      }
    })
  }


  increase(item:CartItem) {
    item.quantityCount++;
    this.updateQuantityCount(item);
    this.getCalculation();
  }
  decrease(item:CartItem) {
    if (item.quantityCount > 1) {
      item.quantityCount--;
      this.updateQuantityCount(item);
      this.getCalculation();

    }

  }

  //updateQuantityCount call service
  updateQuantityCount(item: CartItem) {
    this.cartService.updateQuantityCount(item).subscribe(
      {
        next: (res) => {
          console.log("update QuantityCount", res);
        },
        error: (error) => console.log(error)

      }
    )
  }

  //removeItem call service
  removeCartItem(id: number) {
    this.cartService.removeItem(id).subscribe({
      next: (res) => {
        console.log('remove item cartComponent', res);
        if (res) {
          this.removeItem(id);
        }

      },
      error: (error) => {
        console.log(error);
      }
    })
  }

  //removeItem in component
  removeItem(id: number) {
    let index = this.items.findIndex((item: CartItem) => {
      return item.id === id;
    });
    this.items.splice(index, 1);
    this.getCalculation()
  }

  getSubTotal() {

    console.log(this.subTotal);
  }


  async getCalculation() {
    this.subTotal = await this.cartService.getSubTotalPrice();
    this.gst = (this.subTotal * 18) / 100;
    this.total = this.subTotal + this.gst;

  }




}

//   getCalculation(){
//     this.cartService.getSubTotalPrice().subscribe({
//       next: (res) => {
//         this.subTotal = res;

//       }, error: (error) => {
//         console.error(error);
//       }

//     });


// }
