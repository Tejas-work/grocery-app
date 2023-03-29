import { Injectable } from '@angular/core';
import { CartItem } from '../models/cartItem.model';
import { Grocery } from '../models/grocery.model';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { environment } from 'src/environments/environment.development';
import { BehaviorSubject, Observable, firstValueFrom, map, tap, throwError } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class CartService {
  base = environment.base;
  base_cartItems = environment.base_cartItems;
  private items = new BehaviorSubject<CartItem[]>([]);
  items$ = this.items.asObservable();
  subTotal: number = 0;
  constructor(private http: HttpClient) {
    console.log("con");

    this.getItems().subscribe({
      next: (res) => {
        this.items.next(res);


      }, error: (error) => {
        console.error(error);
      }
    });



  }


  getItems() {
    try {
      return this.http.get<CartItem[]>(this.base + this.base_cartItems).pipe(tap((res) => {
        this.items.next(res);

      }))
    } catch (error: any) {
      return throwError(() => new Error(error));
    }
  }


  addItem(quantityCount: Number, grocery: Grocery) {

    let cartItem: CartItem = {
      id: grocery.id,
      store: grocery.store,
      grocery_name: grocery.grocery_name,
      price: grocery.price,
      discountPrice: grocery.discountPrice,
      category: grocery.category,
      quantity: Number(grocery.quantity),
      quantityCount: Number(quantityCount),
      subtotal: 0,
      imageUrl: grocery.imageUrl
    }
      if (cartItem.discountPrice) {
        cartItem.subtotal = cartItem.discountPrice * cartItem.quantityCount;
      } else {
        cartItem.subtotal = cartItem.price * cartItem.quantityCount;
      }

    try {
      console.log(this.base + this.base_cartItems);
      return this.http.post<CartItem>(this.base + this.base_cartItems, cartItem).pipe(
        tap((res) => {
          const items = this.items.getValue()
          items.push(res);
          this.items.next(items);

        })
      );;
    } catch (error: any) {
      return throwError(() => new Error(error));
    }
  }


  updateQuantityCount(item: CartItem) {
    if (item.discountPrice) {
      item.subtotal = item.discountPrice * item.quantityCount;
    } else {
      item.subtotal = item.price * item.quantityCount;
    }

    try {
      return this.http.put<CartItem>(this.base + this.base_cartItems + "/" + item.id, item).pipe(
        tap((res) => {
          const items = this.items.getValue();
          const index = items.findIndex((i) => i.id === item.id);
          if (index !== -1) {
            items[index] = res;
            this.items.next(items);

          }

        })
      );


    } catch (error: any) {
      return throwError(() => new Error(error));

    }


  }

  removeItem(id: number) {
    try {
      return this.http.delete(this.base + this.base_cartItems + '/' + id).pipe(
        tap(() => {
          const items = this.items.getValue();
          const index = items.findIndex((i) => i.id === id);
          if (index !== -1) {
            items.splice(index, 1);
            this.items.next(items);
          }
        }));

    } catch (error: any) {
      return throwError(() => new Error(error));

    }


  }
  getTotalPrice(): number {
    let total = 0;
    this.items$.subscribe(items => {
      items.forEach(item => {
        total += item.quantityCount * item.price;
      });
    });
    console.log(total);

    return total;
  }

clearCart(){

  this.items.getValue().forEach((item=>{

console.log(item.id);

    try {
      this.http.delete(this.base + this.base_cartItems + '/' + item.id).pipe(
        tap(() => {
          const items = this.items.getValue();
          const index = items.findIndex((i) => i.id === item.id);
          if (index !== -1) {
            items.splice(index, 1);
            this.items.next(items);
          }
        })).subscribe(
        {
          next:(res)=>{
            console.log(res);

          },
          error:(error)=>console.log(error)

        }
      )
    } catch (error: any) {
      throwError(() => new Error(error));

    }

  }))


}






  }









