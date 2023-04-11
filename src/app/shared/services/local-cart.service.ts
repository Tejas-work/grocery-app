import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Product } from '../models/product.model';
import { CartItem, UserCartItem } from '../models/cartItem.model';
import { BehaviorSubject, forkJoin, take, takeUntil, throwError } from 'rxjs';
import { EncryptApiResponse } from '../models/encrypt.model';
import { environment } from 'src/environments/environment.development';
import { Order, OrderApiResponse } from '../models/order.model';
@Injectable({
  providedIn: 'root',
})
export class LocalCartService {
  cart: UserCartItem[] = [];
  userIndex: number = 0;

  //product id which already in cart
  cartProductsId: number[] = [];

  //after login
  userName: any;

  subTotal: number = 0;
  gst: number = 0;
  total: number = 0;

  //observable for cart items array
  items = new BehaviorSubject<CartItem[]>([]);
  items$ = this.items.asObservable();

  constructor(
    private http: HttpClient,
    private toastr: ToastrService,
    private router: Router
  ) {
    const cartData = localStorage.getItem('cart');
    if (cartData) {
      this.cart = JSON.parse(cartData);
    }

    if (sessionStorage.getItem('token')) {
      this.checkCart();
    }
  }

  //start addItem in cart

  addItem(quantityCount: number, category: string, product: Product) {
    //check user login or not, user not login than navigate on login
    if (!sessionStorage.getItem('token')) {
      console.log(!sessionStorage.getItem('token'));

      this.router.navigate(['']);
      this.toastr.warning('please login');
    } else {
      //check product already in cart or not
      let checkProduct = this.cartProductsId.includes(product.id);

      if (!checkProduct) {
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

        //check calculate subtotal
        if (cartItem.discount_amount != 0) {
          cartItem.subtotal = cartItem.discount_amount * cartItem.qty;
        } else {
          cartItem.subtotal = cartItem.product_amount * cartItem.qty;
        }

        //add in cart and localeStorage
        console.log(this.cart);

        let userCart = this.cart[this.userIndex];

        let cart = userCart.cart;

        cart.push(cartItem);

        userCart.cart = cart;

        this.cart[this.userIndex] = userCart;

        localStorage.setItem('cart', JSON.stringify(this.cart));

        console.log(this.cart);
        console.log(this.userIndex);

        console.log(this.cart[this.userIndex].cart);
        console.log(cart);

        this.items.next(cart);

        this.toastr.success('Item added to cart!');
        this.getProductsId();
      } else {
        this.toastr.info('Item added to cart successfully');
      }
    }
  }

  //end addItem in cart

  //update item count start

  updateQuantityCount(item: CartItem) {
    if (item.discount_amount != 0) {
      item.subtotal = item.discount_amount * item.qty;
    } else {
      item.subtotal = item.product_amount * item.qty;
    }

    let userCart = this.cart[this.userIndex];

    let cart = userCart.cart;

    let productIndex = cart.findIndex((product) => product.id == item.id);

    cart[productIndex] = item;
    this.cart[this.userIndex] = userCart;

    localStorage.setItem('cart', JSON.stringify(this.cart));

    this.items.next(cart);
    this.getProductsId();
  }
  //update item count end

  //remove item start

  removeItem(id: number) {
    let userCart = this.cart[this.userIndex];

    let cart = userCart.cart;

    let productIndex = cart.findIndex((product) => product.id == id);

    cart.splice(productIndex, 1);

    userCart.cart = cart;

    this.cart[this.userIndex] = userCart;

    localStorage.setItem('cart', JSON.stringify(this.cart));

    this.items.next(cart);

    console.log(cart);

    this.toastr.success('Item removed from cart!');
    this.getProductsId();
  }

  //remove item end

  //clear cart start
  clearCart() {
    this.cart[this.userIndex].cart = [];

    localStorage.setItem('cart', JSON.stringify(this.cart));

    this.items.next([]);
    this.getProductsId();
  }

  //clear cart end

  getCalculation() {
    this.items$.subscribe((items) => {
      this.subTotal = items.reduce(
        (total, item) => total + item.qty * item.product_amount,
        0
      );
      this.gst = (this.subTotal * 18) / 100;
      this.total = this.subTotal + this.gst;
    });
  }

  //order

  order_url = environment.order;
  base_api = environment.base_url;

  order(deliveryId: number, billingId: number) {
    let order_products;

    const deliveryIdEncrypted$ = this.encrypt(deliveryId);
    const billingIdEncrypted$ = this.encrypt(billingId);

    const combined$ = forkJoin([deliveryIdEncrypted$, billingIdEncrypted$]);

    combined$.subscribe({
      next: ([deliveryIdEncrypted, billingIdEncrypted]) => {
        this.items$.pipe(take(1)).subscribe({
          next: (res) => {
            console.log(deliveryIdEncrypted.data, billingIdEncrypted.data);

            this.getCalculation();
            const discount_amount = 5;
            console.log(typeof this.subTotal);

            const orders: Order = {
              order_date: this.date(),
              special_note: 'special',
              estimate_delivery_date: this.date(),
              sub_total: this.subTotal,
              tax_amount: this.gst,
              discount_amount: 10,
              total_amount: this.subTotal + this.gst - discount_amount,
              paid_amount: this.subTotal,
              payment_type: 2,
              order_products: res.map((res) => {
                return {
                  product_id: res.product_id,
                  product_name: res.product_name,
                  qty: res.qty,
                  product_amount: res.product_amount,
                  discount_type: res.discount_type,
                  discount_amount: res.discount_amount,
                };
              }),
            };

            // Create the headers for the HTTP POST request
            const headers = new HttpHeaders({
              delivery_address_id: String(deliveryIdEncrypted.data),
              billing_address_id: String(billingIdEncrypted.data),
              payment_status: 'W4YV_pkH7OAkvZO4P1gbzA==',
              order_status: 'W4YV_pkH7OAkvZO4P1gbzA==',
            });

            this.http
              .post<OrderApiResponse>(this.base_api + this.order_url, orders, {
                headers,
              })
              .subscribe({
                next: (response) => {
                  console.log('Order created successfully!', response);
                  this.toastr.success('Order placed successfully!');
                  this.clearCart();
                  this.router.navigate(['success']);
                },
                error: (error) => {
                  console.error('Error creating order', error);
                  return throwError(() => new Error(error));
                },
              });
          },
        });
      },
    });
  }

  encrypt_url = environment.encrypt;
  base_url = environment.base_url;
  encrypt(id: number) {
    const headers = new HttpHeaders({
      id: String(id),
      'ngrok-skip-browser-warning': 'skip-browser-warning',
      'Access-Control-Allow-Origin': '*',
    });

    return this.http.get<EncryptApiResponse>(this.base_url + this.encrypt_url, {
      headers,
    });
  }

  date() {
    let date = new Date();
    var getYear = date.toLocaleString('default', { year: 'numeric' });
    var getMonth = date.toLocaleString('default', { month: '2-digit' });
    var getDay = date.toLocaleString('default', { day: '2-digit' });
    var dateFormat = getYear + '-' + getMonth + '-' + getDay;
    return dateFormat;
  }

  checkCart() {
    let user = sessionStorage.getItem('user');

    if (user) {
      let userObj = JSON.parse(user);
      this.userName = userObj?.username;

      if (localStorage.getItem('cart') != null) {
        if (this.userName) {
          this.getItems();
        }
      } else {
        localStorage.setItem('cart', JSON.stringify([]));
        this.getItems();
      }
    }
  }

  getItems() {
    let value = localStorage.getItem('cart');
    if (value != null) {
      console.log('here get item');
      console.log(this.userIndex);

      this.cart = JSON.parse(value);

      this.userIndex = this.cart.findIndex((item) => item.id === this.userName);
      let userCart = this.cart[this.userIndex];
      if (userCart != undefined) {
        this.items.next(userCart.cart);
        this.getProductsId();
      } else {
        this.userIndex = this.cart.length;
        let userCartItem: UserCartItem = {
          id: this.userName,
          cart: [],
        };

        //add new user in cart
        this.cart.push(userCartItem);
        localStorage.setItem('cart', JSON.stringify(this.cart));

        //set in Observable
        this.items.next(userCartItem.cart);
      }
    }
  }

  getProductsId() {
    this.items$.subscribe({
      next: (res) => {
        if (res.length > 0) {
          this.cartProductsId = res.map((product) => product.id);
          console.log(this.cartProductsId);
        }
      },
      error: (error) => console.log(error),
    });
  }

  get localStorageCart(): any[] {
    return JSON.parse(localStorage.getItem('cart') || '[]');
  }

  set localStorageCart(cart: any[]) {
    localStorage.setItem('cart', JSON.stringify(cart));
  }
}
