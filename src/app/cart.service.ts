import { Injectable } from '@angular/core';
import { CartItem } from './cartItem.model';
import { Grocery } from './grocery.model';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { environment } from 'src/environments/environment.development';
import { BehaviorSubject, Observable, firstValueFrom, map, tap, throwError } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class CartService {
  base=environment.base;
  base_url =environment.base_url;
  private items = new BehaviorSubject<CartItem[]>([]);

  constructor(private http:HttpClient ) {

    this.getItems().subscribe({
      next: (res) => {
        console.log('cons',res);

        this.items.next(res);

      }, error: (error) => {
        console.error(error);
      }
    })

  }


  getItems(){
    try
    {
      return this.http.get<CartItem[]>(this.base+this.base_url)
    }catch(error:any){
      return throwError(()=> new Error(error));
    }
  }


  addItem(quantityCount:Number,grocery:Grocery){
    let cartItem:CartItem={
      id: grocery.id,
      grocery_name: grocery.grocery_name,
      price: grocery.price,
      quantity: Number(grocery.quantity),
      quantityCount:Number(quantityCount),
      subtotal: 0,
      imageUrl: grocery.imageUrl
    }
     try {
      console.log(this.base+this.base_url);
      return this.http.post<CartItem>(this.base+this.base_url,cartItem);
    } catch (error:any) {
      return throwError(() => new Error(error));
    }
  }


  updateQuantityCount(item:CartItem){

    try {
     return this.http.put<CartItem>(this.base+this.base_url+"/"+item.id,item);


    } catch (error:any) {
      return throwError(()=> new Error(error));

    }


  }

  removeItem(id:number){
   try {
    return this.http.delete(this.base+this.base_url+'/'+id);

   } catch (error:any) {
    return throwError(()=> new Error(error));

   }

  }

  async getSubTotalPrice(): Promise<number> {
    const items = await firstValueFrom(this.getItems());

    let subTotal = 0;
    if (items && items.length > 0) {
      subTotal = items.reduce((total: number, item: CartItem) => {
        return total + item.quantityCount * item.price;
      }, 0);
    }
    console.log(subTotal);
    return subTotal;
  }


  numberOfCartItems(){
    let count = this.items.subscribe.length;
    console.log('len',count);
    return count;

  }
  }



