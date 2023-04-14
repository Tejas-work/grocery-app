import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductsService } from 'src/app/shared/services/products.service';
import { Category } from 'src/app/shared/models/category.model';
import { NgxSpinnerService } from 'ngx-spinner';
import { LocalCartService } from 'src/app/shared/services/local-cart.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css'],
})
export class CategoryComponent implements OnInit {
  getBrandProduct(category: string, brand: string) {
    debugger;

    this.router.navigate(['products', category, brand]);
  }

  /*
  categories all categories data
  [
    {
        "id": 1,
        "title": "category-1",
        "parent_id": null
    }
  ]
  */
  categories: Category[] = [];
  products: any;
  total: number = 0;
  duplicate: any;
  brands: string[] = [];
  productCategory: string = '';
  word: string | undefined;
  selectedBrands: string[] = [];
  brand: string = '';
  addCartMsg = 'Add successfully';

  constructor(
    private cartService: LocalCartService,
    private route: ActivatedRoute,
    private productService: ProductsService,
    private router: Router,
    private spinner: NgxSpinnerService
  ) {}

  async ngOnInit() {
    //start top
    window.scrollTo(0, 0);

    await this.getAllCategories();

    //get category from route and get data
    this.route.params.subscribe((params) => {
      console.warn(params);
      this.productCategory = params['category'];
      this.word = params['word'];
      this.brand = params['brand'];

      if (this.word && this.productCategory) {
        this.getSearchCategoryData(this.productCategory, this.word);
        console.log(this.word);
      } else if (this.productCategory == 'All') {
        this.productService.getAllProducts().subscribe({
          next: (res) => {
            console.log(res);
            this.products = res.data;
          },
        });
      } else if (this.productCategory) {
        this.getGroceriesByCategoryData(this.productCategory);
        console.log(this.productCategory);
      }
    });
  }

  getGroceriesByCategoryData(category: string) {
    this.spinner.show();
    console.log(this.categories);
    console.log(category != 'All');

    if (category != 'All') {
      let categoryData = this.categories.filter(
        (item) => item.title == category
      )[0];
      this.productService.getProductByCategory(categoryData.id).subscribe({
        next: (value) => {
          this.products = value;
          console.log(value);
          this.spinner.hide();
        },
        error: (error) => console.log(error),
      });
    }
  }

  getSearchCategoryData(category: string, word: string) {
    console.log(this.categories);
    console.log(category != 'All');

    if (category != 'All') {
      let categoryData = this.categories.filter(
        (item) => item.title == category
      )[0];
      this.productService.getProductByCategory(categoryData.id).subscribe({
        next: (value) => {
          let search = value.filter((product: any) => {
            return (
              product.title.toLowerCase().indexOf(word.toLowerCase()) != -1
            );
          });
          this.products = search;
          console.log(search);
        },
        error: (error) => console.log(error),
      });
    } else {
      this.productService.getAllProducts().subscribe({
        next: (res) => {
          if (res.data) {
            let search = res.data.filter((product: any) => {
              return (
                product.title.toLowerCase().indexOf(word.toLowerCase()) != -1
              );
            });
            this.products = search;
            console.log(search);
          }
        },
        error: (error) => console.log(error),
      });
    }
  }

  navigateDetails(id: number) {
    this.router.navigate(['product-details', id, this.productCategory]);
  }

  addCart(product: any) {
    this.cartService.addItem(1, this.productCategory, product);
  }

  isChange = false;
  display() {
    this.isChange = !this.isChange;
  }

  async getAllCategories() {
    try {
      const res = await this.productService.getAllCategories().toPromise();
      if (res) {
        if (res?.data) {
          console.log(res);

          this.categories = res.data;
          console.log(this.categories);
        }
      }
    } catch (error) {
      console.log(error);
    }
  }
}
