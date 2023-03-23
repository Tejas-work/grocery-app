import { Component, ViewChild, ElementRef, HostListener } from '@angular/core';
import { GroceriesService } from '../groceries.service';
import { Router } from '@angular/router';
import { CartService } from '../cart.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  isSticky = false;

 
  selectedCategory: string = 'All'

  cartItemsCount=0;


  constructor(private groceriesService: GroceriesService, private cartService: CartService, private router: Router) { }


 async ngOnInit() {
    this.categories = this.groceriesService.getCategories();
    this.cartItemsCount=this.cartService.numberOfCartItems();
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
      this.router.navigate(['search-groceries', this.selectedCategory, inputValue])
    }

  }

  subTotal: number = 0;
  gst: number = 0;
  total: number = 0;
  async getCalculation() {
    this.subTotal = await this.cartService.getSubTotalPrice();
    this.gst = (this.subTotal * 18) / 100;
    this.total = this.subTotal + this.gst;

  }
  categories: string[] = ['']




}
