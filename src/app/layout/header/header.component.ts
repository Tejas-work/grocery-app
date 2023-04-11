import { Component, ViewChild, ElementRef, HostListener } from '@angular/core';
import { Router } from '@angular/router';


import { Category } from 'src/app/shared/models/category.model';
import { AuthService } from 'src/app/shared/services/auth.service';
import { LocalCartService } from 'src/app/shared/services/local-cart.service';
import { ProductsService } from 'src/app/shared/services/products.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent {
  logOut() {
    this.authService.logOut();
    this.router.navigate(['']);
  }
  //check LogIn

  categories: Category[] = [];
  isLogin: boolean = false;
  subTotal: number = 0;
  gst: number = 0;
  total: number = 0;
  userName: string = '';
  selectedCategory: string = '';

  cartItemsCount = 0;

  constructor(
    private cartService: LocalCartService,
    private router: Router,
    private authService: AuthService,
    private productService: ProductsService
  ) {


    this.cartService.items$.subscribe((res) => {
      console.log('here');
      console.log(res.length);

      this.cartItemsCount = res.length;
    });

  }

  ngOnInit() {



    this.getAllCategories();
    this.getCalculation();
     //check user is login or not
     this.authService.isLogin$.subscribe((res) => {
      this.isLogin = res;
      const jsonString = sessionStorage.getItem('user');
      if (jsonString) {
        const userObj = JSON.parse(jsonString);
        this.userName = userObj.first_name + ' ' + userObj.last_name;
      }
    });
  }

  navigateCart() {
    this.router.navigate(['cart']);
  }

  countCartItems(){
    this.cartService.items$.subscribe((res) => {
      console.log('here');
      console.log(res.length);

      this.cartItemsCount = res.length;
    });


  }
  getAllCategories() {
    this.productService.getAllCategories().subscribe({
      next: (res) => {
        if (res?.data) {
          console.log(res);

          this.categories = res.data;
          console.log(this.categories);
        }
      },
    });
  }

  getSelectedCategory(category: any) {
    this.selectedCategory = category;
  }



  myValue?: HTMLImageElement;

  onSubmit(event: Event) {
    event.preventDefault();
    const inputValue = this.myValue;
    if (inputValue) {
      this.router.navigate([
        'groceries/search/grocery-search',
        this.selectedCategory,
        inputValue,
      ]);
    }
  }

  getCalculation() {
    this.cartService.items$.subscribe((items) => {

      this.subTotal = items.reduce(
        (total, item) => total + item.qty * item.product_amount,
        0
      );
      console.log(this.subTotal);
      this.gst = (this.subTotal * 18) / 100;
      this.total = this.subTotal + this.gst;
    });
  }

}

