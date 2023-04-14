import { Injectable } from '@angular/core';
import { CartItem, UserCartItem } from '../models/cartItem.model';
import { Grocery } from '../models/grocery.model';
import {
  HttpClient,
  HttpClientModule,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { environment } from 'src/environments/environment.development';
import {
  BehaviorSubject,
  Observable,
  catchError,
  finalize,
  firstValueFrom,
  forkJoin,
  map,
  of,
  switchMap,
  take,
  tap,
  throwError,
} from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { Product } from '../models/product.model';
import { Order, OrderApiResponse, OrderProduct } from '../models/order.model';
import { Router } from '@angular/router';
import { EncryptApiResponse } from '../models/encrypt.model';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  // base_api = environment.base_url;
  // categories_url = environment.getCategory_url;

  // base = environment.base;
  // base_cartItems = environment.base_cartItems;

  // subTotal: number = 0;
  // gst: number = 0;
  // total: number = 0;

  // isLogin: boolean = false;
  // headers = new HttpHeaders({
  //   'ngrok-skip-browser-warning': 'skip-browser-warning',
  //   'Access-Control-Allow-Origin': '*',
  // });
  // userName: any;

  // //constructor
  // constructor(
  //   private http: HttpClient,
  //   private toastr: ToastrService,
  //   private router: Router
  // ) {
  //   //check is login or

  //   let user = sessionStorage.getItem('user');

  //   if (user) {
  //     let userObj = JSON.parse(user);
  //     this.userName = userObj.username;
  //     this.getItems().subscribe({
  //       next: (res) => {
  //         this.items.next(res);
  //       },
  //       error: (error) => {
  //         console.error(error);
  //       },
  //     });
  //   }

  //   console.log('con');
  // }

  // getItems() {
  //   try {
  //     return this.http.get<CartItem[]>(this.base + this.base_cartItems).pipe(
  //       tap((res) => {
  //         console.log(res);

  //         this.getCartGroceriesItemsId();
  //         this.items.next(res);
  //       })
  //     );
  //   } catch (error: any) {
  //     return throwError(() => new Error(error));
  //   }
  // }

  // addItem(
  //   quantityCount: number,
  //   category: string,
  //   product: Product
  // ): Observable<boolean> {
  //   let cartItem: CartItem = {
  //     id: product.id,
  //     product_id: product.id,
  //     product_name: product.title,
  //     qty: quantityCount,
  //     product_amount: product.amount,
  //     discount_type: product.discount_type,
  //     discount_amount: 0,
  //     category: category,
  //     subtotal: 0,
  //   };
  //   cartItem.subtotal = cartItem.product_amount * cartItem.qty;

  //   try {
  //     return this.http
  //       .post<CartItem>(this.base + this.base_cartItems, cartItem)
  //       .pipe(
  //         take(1),
  //         tap((res) => {
  //           //update items BehaviorSubject
  //           const items = this.items.getValue();
  //           items.push(res);
  //           this.items.next(items);

  //           //toast message for user
  //           this.toastr.success('Item added to cart!');
  //         }),
  //         map(() => true),
  //         catchError((error) => {
  //           console.log(error);
  //           return of(false);
  //         })
  //       );
  //   } catch (error: any) {
  //     console.log(error);

  //     return throwError(() => new Error(error));
  //   }
  // }

  // updateQuantityCount(item: CartItem) {
  //   if (item.discount_amount != 0) {
  //     item.subtotal = item.discount_amount * item.qty;
  //   } else {
  //     item.subtotal = item.product_amount * item.qty;
  //   }

  //   try {
  //     return this.http
  //       .put<CartItem>(
  //         this.base + this.base_cartItems + '/' + item.product_id,
  //         item
  //       )
  //       .pipe(
  //         tap((res) => {
  //           //update items BehaviorSubject
  //           const items = this.items.getValue();
  //           const index = items.findIndex(
  //             (i) => i.product_id === item.product_id
  //           );
  //           if (index !== -1) {
  //             items[index] = res;
  //             this.items.next(items);
  //           }
  //         })
  //       );
  //   } catch (error: any) {
  //     return throwError(() => new Error(error));
  //   }
  // }

  // removeItem(id: number) {
  //   try {
  //     return this.http.delete(this.base + this.base_cartItems + '/' + id).pipe(
  //       tap(() => {
  //         //update items BehaviorSubject
  //         const items = this.items.getValue();
  //         const index = items.findIndex((i) => i.product_id === id);
  //         if (index !== -1) {
  //           items.splice(index, 1);
  //           this.items.next(items);
  //         }

  //         //toast message for user
  //         this.toastr.success('Item removed from cart!');
  //       })
  //     );
  //   } catch (error: any) {
  //     return throwError(() => new Error(error));
  //   }
  // }

  // clearCart() {
  //   this.items.getValue().forEach((item) => {
  //     console.log(item.id);

  //     try {
  //       this.http
  //         .delete(this.base + this.base_cartItems + '/' + item.id)
  //         .pipe(
  //           tap(() => {
  //             //update items BehaviorSubject
  //             const items = this.items.getValue();
  //             const index = items.findIndex((i) => i.id === item.id);
  //             if (index !== -1) {
  //               items.splice(index, 1);
  //               this.items.next(items);
  //             }
  //           })
  //         )
  //         .subscribe({
  //           next: (res) => {
  //             console.log(res);
  //           },
  //           error: (error) => console.log(error),
  //         });
  //     } catch (error: any) {
  //       throwError(() => new Error(error));
  //     }
  //   });
  // }

  // getCartGroceriesItemsId() {
  //   this.items$.subscribe({
  //     next: (res) => {
  //       let id = res.map((item) => item.product_id);
  //       console.log(id);
  //     },
  //     error: (error) => console.log(error),
  //   });
  // }

  // date() {
  //   let date = new Date();
  //   var getYear = date.toLocaleString('default', { year: 'numeric' });
  //   var getMonth = date.toLocaleString('default', { month: '2-digit' });
  //   var getDay = date.toLocaleString('default', { day: '2-digit' });
  //   var dateFormat = getYear + '-' + getMonth + '-' + getDay;
  //   return dateFormat;
  // }
  // order_url = environment.order;

  // order(deliveryId: number, billingId: number) {
  //   const deliveryIdEncrypted$ = this.encrypt(deliveryId);
  //   const billingIdEncrypted$ = this.encrypt(billingId);

  //   const combined$ = forkJoin([deliveryIdEncrypted$, billingIdEncrypted$]);

  //   combined$.subscribe({
  //     next: ([deliveryIdEncrypted, billingIdEncrypted]) => {
  //       this.items$.pipe(take(1)).subscribe({
  //         next: (res) => {
  //           console.log(deliveryIdEncrypted.data, billingIdEncrypted.data);

  //           this.getCalculation();
  //           const discount_amount = 5;
  //           console.log(typeof this.subTotal);

  //           const orders: Order = {
  //             order_date: this.date(),
  //             special_note: 'special',
  //             estimate_delivery_date: this.date(),
  //             sub_total: this.subTotal,
  //             tax_amount: this.gst,
  //             discount_amount: 10,
  //             total_amount: this.subTotal + this.gst - discount_amount,
  //             paid_amount: this.subTotal,
  //             payment_type: 2,
  //             order_products: res.map((res) => {
  //               return {
  //                 product_id: res.product_id,
  //                 product_name: res.product_name,
  //                 qty: res.qty,
  //                 product_amount: res.product_amount,
  //                 discount_type: res.discount_type,
  //                 discount_amount: res.discount_amount,
  //               };
  //             }),
  //           };

  //           // Create the headers for the HTTP POST request
  //           const headers = new HttpHeaders({
  //             delivery_address_id: String(deliveryIdEncrypted.data),
  //             billing_address_id: String(billingIdEncrypted.data),
  //             payment_status: 'W4YV_pkH7OAkvZO4P1gbzA==',
  //             order_status: 'W4YV_pkH7OAkvZO4P1gbzA==',
  //           });

  //           this.http
  //             .post<OrderApiResponse>(this.base_api + this.order_url, orders, {
  //               headers,
  //             })
  //             .subscribe({
  //               next: (response) => {
  //                 console.log('Order created successfully!', response);
  //                 this.toastr.success('Order placed successfully!');
  //                 this.clearCart();
  //                 this.router.navigate(['success']);
  //               },
  //               error: (error) => {
  //                 console.error('Error creating order', error);
  //                 return throwError(() => new Error(error));
  //               },
  //             });
  //         },
  //       });
  //     },
  //   });
  // }

  // encrypt_url = environment.encrypt;
  // base_url = environment.base_url;
  // encrypt(id: number) {
  //   const headers = new HttpHeaders({
  //     id: String(id),
  //     'ngrok-skip-browser-warning': 'skip-browser-warning',
  //     'Access-Control-Allow-Origin': '*',
  //   });

  //   return this.http.get<EncryptApiResponse>(this.base_url + this.encrypt_url, {
  //     headers,
  //   });
  // }

  // getCalculation() {
  //   this.items$.subscribe((items) => {
  //     this.subTotal = items.reduce(
  //       (total, item) => total + item.qty * item.product_amount,
  //       0
  //     );
  //     this.gst = (this.subTotal * 18) / 100;
  //     this.total = this.subTotal + this.gst;
  //   });
  // }

  // private items = new BehaviorSubject<CartItem[]>([]);
  // items$ = this.items.asObservable();

  // updateItems(data: CartItem[]) {
  //   this.items.next(data);
  //   console.log(this.items.getValue());
  // }
}
