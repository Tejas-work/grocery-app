import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { take } from 'rxjs';
import { CartService } from 'src/app//shared/services/cart.service';
import { CartItem } from 'src/app/shared/models/cartItem.model';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent {
  categories:any;
  categoriesAll:any;
  count: number = 0
  changeCount() {
    console.log(this.count);

  }
  checkOut() {
    this.router.navigate(['checkOut']);
  }



  items: CartItem[] = [];
  itemsByCategories: { [key: string]: { items: any[], total: number } } = {};

  tes: CartItem[] = [];
  subTotal: number = 0;
  gst: number = 0;
  total: number = 0;


  constructor(
    private cartService: CartService,
    private router: Router


  ) {
    this.getCartItems();
    // this.getAll()
  }

  async ngOnInit() {
    window.scrollTo(0, 0);
    this.getCalculation();

    try {
        this.cartService.getAllCategories().subscribe({
        next:(res)=>{
          this.categories=res;
          console.log(this.categories);

        }
      });
    } catch (error) {
      console.error('Error:', error);
    }

  }


  getCartItems() {
    this.cartService.items$.subscribe({
      next: (res) => {
        this.items = res;
        this.getItemsByCategory();
        console.log(this.itemsByCategories)
      }, error: (error) => {
        console.error(error);
      }
    })
  }


  increase(item: CartItem) {
    this.count++;
    item.quantityCount++;
    this.updateQuantityCount(item);
    // this.getItemsByCategory();
  }
  decrease(item: CartItem) {
    if (item.quantityCount > 1) {
      this.count--;
      item.quantityCount--;
      this.updateQuantityCount(item);
      // this.getItemsByCategory();

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
        // if (res) {
        //   this.getItemsByCategory();
        // }

      },
      error: (error) => {
        console.log(error);
      }
    })
    this.getCartItems();
  }

  //removeItem in component





  getCalculation() {
    this.cartService.items$.subscribe(items => {
      this.subTotal = items.reduce((total, item) => total + (item.quantityCount * item.price), 0);
      console.log(this.subTotal);
      this.gst = (this.subTotal * 18) / 100;
      this.total = this.subTotal + this.gst;
    });


  }


  getItemsByCategory() {
    this.itemsByCategories = {};
    this.cartService.items$.pipe(take(1)).subscribe((items) => {
      items.forEach((item) => {
        if (!this.itemsByCategories.hasOwnProperty(item?.category)) {
          this.itemsByCategories[item?.category] = { items: [item], total: item.subtotal };
        } else {
          this.itemsByCategories[item.category].items.push(item);
          this.itemsByCategories[item.category].total += item.subtotal;
        }
      });
    });
  }









}

