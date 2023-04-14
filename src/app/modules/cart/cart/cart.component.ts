import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmBoxEvokeService, ConfirmBoxInitializer, DialogLayoutDisplay } from '@costlydeveloper/ngx-awesome-popup';
import { NgxSpinnerService } from 'ngx-spinner';
import { take } from 'rxjs';
import { CartService } from 'src/app//shared/services/cart.service';
import { CartItem } from 'src/app/shared/models/cartItem.model';
import { AuthService } from 'src/app/shared/services/auth.service';
import { LocalCartService } from 'src/app/shared/services/local-cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent {


  count: number = 0





  items: CartItem[] = [];
  itemsByCategories: { [key: string]: { items: any[], total: number } } = {};

  tes: CartItem[] = [];
  subTotal: number = 0;
  gst: number = 0;
  total: number = 0;


  constructor(
    private cartService: LocalCartService,
    private router: Router,
    private spinner: NgxSpinnerService,
    private confirmBoxEvokeService: ConfirmBoxEvokeService


  ) {


  }

 ngOnInit() {
    window.scrollTo(0, 0);
    this.getCartItems();
    this.getCalculation();

  }


  getCartItems() {
    this.spinner.show();
    this.cartService.items$.subscribe({
      next: (res) => {
        this.items = res;
        this.getItemsByCategory();
        console.log(this.itemsByCategories)
        this.spinner.hide();
      }, error: (error) => {
        this.spinner.hide();
        console.error(error);
      }
    })
  }


  increase(item: CartItem) {
    this.count++;
    item.qty++;
    this.updateQuantityCount(item);
    this.getItemsByCategory();
  }
  decrease(item: CartItem) {
    if (item.qty > 1) {
      this.count--;
      item.qty--;
      this.updateQuantityCount(item);
      // this.getItemsByCategory();

    }

  }

  //updateQuantityCount call service
  updateQuantityCount(item: CartItem) {
    this.cartService.updateQuantityCount(item);
  }

  //removeItem call service
  removeCartItem(id: number) {
    const confirmBox = new ConfirmBoxInitializer();
    confirmBox.setTitle('Are you sure?');
    confirmBox.setMessage('Do you want to Delete?');
    confirmBox.setButtonLabels('DELETE', 'CANCEL');

    // Choose layout color type
    confirmBox.setConfig({
      layoutType: DialogLayoutDisplay.DANGER, // SUCCESS | INFO | NONE | DANGER | WARNING
    });

    // Simply open the popup and listen which button is clicked
    confirmBox.openConfirmBox$().subscribe((resp: any) => {
      // IConfirmBoxPublicResponse
      console.log('Clicked button response: ', resp);

      if (resp.success) {

        this.cartService.removeItem(id)

      }
    })
  }







  getCalculation() {
    this.cartService.items$.subscribe(items => {
      this.subTotal = items.reduce((total, item) => total + (item.qty * item.product_amount), 0);
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


  checkOut() {
    this.router.navigate(['checkOut']);


  }








}

