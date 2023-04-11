import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Product } from '../models/product.model';
import { CartItem, UserCartItem } from '../models/cartItem.model';
import { BehaviorSubject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class LocalCartService {


  private items = new BehaviorSubject<CartItem[]>([]);
  items$ = this.items.asObservable();

  subTotal: number = 0;
  gst: number = 0;
  total: number = 0;

  isLogin: boolean = false;
  headers = new HttpHeaders(
    {
      'ngrok-skip-browser-warning': 'skip-browser-warning', 'Access-Control-Allow-Origin': '*'
    }
  )
  userName: any;





  constructor(private http: HttpClient, private toastr: ToastrService, private router: Router) {
    let user = sessionStorage.getItem('user');

    if (user) {
      let userObj = JSON.parse(user)
      this.userName = userObj?.username;
    }

  }



  getItems() {
    let value = localStorage.getItem('cart')
    if (value != null) {

      let userItem: UserCartItem[] = JSON.parse(value);
      let item: UserCartItem | undefined = userItem.find((item) => item.id === this.userName);
      if (item != undefined) {
        this.items.next(item.cart);
      }
    }else{

    }

  }


  //start addItem in cart

  addItem(quantityCount: number, category: string, product: Product) {

    //check user login or not, user not login than navigate on login
    if (!sessionStorage.getItem('token')) {
      console.log(!sessionStorage.getItem('token'));

      this.router.navigate(['']);
      this.toastr.warning("please login");
    }


    let cartItem: CartItem = {
      id: product.id,
      product_id: product.id,
      product_name: product.title,
      qty: quantityCount,
      product_amount: product.amount,
      discount_type: product.discount_type,
      discount_amount: 0,
      category: category,
      subtotal: 0,
    };

    if (cartItem.discount_amount != 0) {
      cartItem.subtotal = cartItem.discount_amount * cartItem.qty;
    } else {
      cartItem.subtotal = cartItem.product_amount * cartItem.qty;
    }


  }

  //end addItem in cart

}
