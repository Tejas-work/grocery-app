import { Component, AfterViewInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GroceriesService } from 'src/app/shared/services/groceries.service';
import { Grocery } from 'src/app/shared/models/grocery.model';
import { ToastrService } from 'ngx-toastr';
import { ProductsService } from '../../services/products.service';
import { Category } from '../../models/category.model';
import { LocalCartService } from '../../services/local-cart.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-featured-product',
  templateUrl: './featured-product.component.html',
  styleUrls: ['./featured-product.component.css'],
})
export class FeaturedProductComponent {
  categories: Category[] = [];
  groceries: Grocery[] = [];
  products: any;

  constructor(
    private groceriesService: GroceriesService,
    private cartService: LocalCartService,
    private router: Router,
    private productService: ProductsService,
    private spinner: NgxSpinnerService
  ) {
    this.groceries = this.groceriesService.getGroceryList().slice(0, 15);
    this.getAllCategories();
  }

  ngOnInit() {
    this.spinner.show();
    this.productService.getAllProducts().subscribe({

      next: (res) => {
        console.log(res);
        this.products = res.data;
        this.spinner.hide();
      },
    });
  }

  getAllCategories() {
    this.spinner.show();
    this.productService.getAllCategories().subscribe({
      next: (res) => {
        if (res?.data) {
          console.log(res);

          this.categories = res.data;
          console.log(this.categories);
          this.spinner.hide();
        }
      },
      error: (error) => console.log(error),
    });
  }

  navigateDetails(id: number) {
    this.router.navigate(['product-details', id, 'All']);
  }
  addCart(product: any) {
    this.cartService.addItem(1, 'All', product);
  }
}
