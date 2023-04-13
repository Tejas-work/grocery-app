import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import {
  BehaviorSubject,
  catchError,
  map,
  switchMap,
  tap,
  throwError,
} from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { Category, CategoryApiResponse } from '../models/category.model';
import { Product } from '../models/product.model';
import { NgxSpinnerService } from 'ngx-spinner';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  private products = new BehaviorSubject<any>([]);
  products$ = this.products.asObservable();
  productByCategory = new BehaviorSubject<any>([]);
  productByCategory$ = this.productByCategory.asObservable;

  headers = new HttpHeaders({
    'ngrok-skip-browser-warning': 'skip-browser-warning',
    'Access-Control-Allow-Origin': '*',
  });
  constructor(private http: HttpClient, private toastr: ToastrService, private spinner: NgxSpinnerService) {
    this.getAllProducts().subscribe({
      next: (res) => {
        console.log(res);

        this.products.next(res);
      },
      error: (error) => {
        console.error(error);
      },
    });
  }

  base_url = environment.base_url;
  categories_url = environment.getCategory_url;
  product_all_url = environment.getAll_products;

  getAllCategories() {
    try {
      return this.http.get<CategoryApiResponse>(
        this.base_url + this.categories_url,
        {
          headers: this.headers,
        }
      );
    } catch (error: any) {
      return throwError(() => new Error(error));
    }
  }

  getAllProducts() {
    try {
      return this.http
        .get<any>(this.base_url + this.product_all_url, {
          headers: this.headers,
        })
        .pipe(
          tap((res) => {
            this.products.next(res);
          })
        );
    } catch (error: any) {
      return throwError(() => new Error(error));
    }
  }

  product_by_category_url = environment.getProduct_category;

  getProductByCategory(id: number) {
    return this.encrypt(id).pipe(
      switchMap((res) => {
        const encryptId = res.data;
        const headers = new HttpHeaders({
          category_id: String(encryptId),
          'ngrok-skip-browser-warning': 'skip-browser-warning',
          'Access-Control-Allow-Origin': '*',
        });
        return this.http
          .get<any>(this.base_url + this.product_by_category_url, { headers })
          .pipe(map((res) => res.data.map((item: any) => item.product)));
      }),
      catchError((error: any) => {
        return throwError(() => new Error(error));
      })
    );
  }

  encrypt_url = environment.encrypt;

  encrypt(id: number) {
    const headers = new HttpHeaders({
      id: String(id),
      'ngrok-skip-browser-warning': 'skip-browser-warning',
      'Access-Control-Allow-Origin': '*',
    });

    return this.http.get<any>(this.base_url + this.encrypt_url, { headers });
  }
}
