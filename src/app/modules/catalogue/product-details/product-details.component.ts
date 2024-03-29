import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { GroceriesService } from 'src/app/shared/services/groceries.service';

import { LocalCartService } from 'src/app/shared/services/local-cart.service';
@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css'],
})
export class ProductDetailsComponent {
  change() {
    if (this.quantityCount <= 0) {
      this.errorMessage=true


    } else {
      this.errorMessage=false;

    }

}
  goCart() {
    this.router.navigate(['cart']);
  }

  grocery: any;
  errorMessage:boolean=false;
  addedInCartItem: any[] = [];
  checkCart = true;

  quantityCount: number = 1;
  button_text = 'Add Cart';
  add = true;
  category: string = '';
  constructor(
    private groceriesService: GroceriesService,
    private cartService: LocalCartService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.cartService.items$.subscribe({
      next: (res) => {
        this.addedInCartItem = res.map((item) => item.product_id);
        console.log('details', this.addedInCartItem);
      },
      error: (error) => console.log(error),
    });
  }

  async ngOnInit() {
    window.scrollTo(0, 0);
    this.route.params.subscribe((param) => {
      let check = this.groceriesService.getGrocery(Number(param['id']));
      this.category = param[this.category];
      if (check) {
        this.grocery = check;
      }
    });
  }

  addCart() {
    console.log(this.quantityCount);
    if (this.quantityCount < 0) {
      this.errorMessage=true


    } else {
      this.cartService.addItem(this.quantityCount, this.category, this.grocery);

    }
    this.errorMessage = true;


    // .subscribe(
    //   {
    //     next: (res) => {
    //       console.log('addCart', res);
    //       this.router.navigate(['cart']);

    //     },
    //     error: (error) => {
    //       console.log(error);
    //     }
    //   }
    // )
  }

  checkInCart(id: number) {
    this.checkCart = this.addedInCartItem.includes(id);
    return this.checkCart;
  }
}
