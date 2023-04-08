import { Component, ViewChild, ElementRef, HostListener } from '@angular/core';
import { Router } from '@angular/router';

import { CartService } from 'src/app//shared/services/cart.service';
import { AuthService } from 'src/app/shared/services/auth.service';
import { GroceriesService } from 'src/app/shared/services/groceries.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
logOut() {

  this.authService.logOut();
  this.router.navigate(['']);

}
  //check LogIn


  isLogin: boolean = false;
  subTotal: number = 0;
  gst: number = 0;
  total: number = 0;
  userName:string='';
  selectedCategory: string = 'All'

  cartItemsCount = 0;


  constructor(private groceriesService: GroceriesService, private cartService: CartService, private router: Router,private authService:AuthService) {
    this.cartService.items$.subscribe((res) => {
      this.cartItemsCount = res.length
    })

    //check user is login or not
    authService.isLogin$.subscribe((res)=>{
      this.isLogin=res;
      const jsonString = sessionStorage.getItem('user');
      if(jsonString){
      const userObj = JSON.parse(jsonString);
        this.userName=userObj.first_name+" "+userObj.last_name
      }
    })




  }


  async ngOnInit() {




    this.categories = this.groceriesService.getCategories();
    this.getCalculation();

  }


  navigateCart() {
    this.router.navigate(['cart']);
  }




  getSelectedCategory(category: string) {
    this.selectedCategory = category;
  }


  // @ViewChild('search')
  // searchInput!: ElementRef;

  myValue?: HTMLImageElement;

  onSubmit(event: Event) {
    event.preventDefault();
    const inputValue = this.myValue;
    if (inputValue) {
      this.router.navigate(['groceries/grocery-search', this.selectedCategory, inputValue])
    }

  }


  getCalculation() {
    this.cartService.items$.subscribe(items => {
      this.subTotal = items.reduce((total, item) => total + (item.qty * item.product_amount), 0);
      console.log(this.subTotal);
      this.gst = (this.subTotal * 18) / 100;
      this.total = this.subTotal + this.gst;
    });
  }
  categories: string[] = ['']




}
