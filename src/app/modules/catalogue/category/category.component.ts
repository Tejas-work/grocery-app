import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CartService } from 'src/app//shared/services/cart.service';
import { GroceriesService } from 'src/app/shared/services/groceries.service';
import { Product } from 'src/app/shared/models/product.model';
import { ToastrService } from 'ngx-toastr';
import { ProductsService } from 'src/app/shared/services/products.service';
import { Category } from 'src/app/shared/models/category.model';
import { NgxSpinnerService } from "ngx-spinner";



@Component({

  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css'],
})
export class CategoryComponent implements OnInit {
  getBrandProduct(category: string, brand: string) {
    debugger

    this.router.navigate(['products', category, brand])
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
  categories: Category[] = []
  products: any;
  total: number = 0;
  duplicate: any;
  brands: string[] = [];
  productCategory: string = '';
  word: string | undefined;
  selectedBrands: string[] = [];
  brand: string = '';
  addCartMsg = "Add successfully"


  constructor(
    private groceriesService: GroceriesService,
    private cartService: CartService,
    private route: ActivatedRoute,
    private toastr: ToastrService,
    private productService: ProductsService,
    private router: Router,
    private spinner: NgxSpinnerService
  ) {

  }

  async ngOnInit() {
    //start top
    window.scrollTo(0, 0);


    // setTimeout(() => {
    //   /** spinner ends after 5 seconds */
    //   this.spinner.hide();
    // }, 5000);
    await this.getAllCategories();

    //get category from route and get data
    this.route.params.subscribe((params) => {
      console.warn(params);
      this.productCategory = params['category'];
      this.word = params['word'];
      this.brand = params['brand'];

      //   if(this.brand){
      //     this.getGroceriesByBrandData(this.brand);
      //     console.log(this.brand);

      //     }


      console.log(this.productCategory,this.word);

     if (this.word && this.productCategory) {
          this.getSearchCategoryData(this.productCategory, this.word);
          console.log(this.word);

        }

      else if(this.productCategory=='All'){

        this.productService.getAllProducts().subscribe(
          {
            next:(res)=>{
              console.log(res);
              this.products=res.data

            }
          }
        )

    }
      else if (this.productCategory) {
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
      let categoryData = this.categories.filter((item) => item.title == category)[0]
      this.productService.getProductByCategory(categoryData.id).subscribe(
        {
          next: (value) => {
            this.products = value;
            console.log(value);
            this.spinner.hide();

          }, error: (error) => console.log(error)

        }
      )
    }






  }

  getSearchCategoryData(category: string, word: string) {
    console.log(this.categories);
    console.log(category != 'All');

    if (category != 'All') {
      let categoryData = this.categories.filter((item) => item.title == category)[0]
      this.productService.getProductByCategory(categoryData.id).subscribe(
        {
          next: (value) => {
            let search = value.filter((product:any) => {
              return (
               product.title.toLowerCase().indexOf(word.toLowerCase()) != -1
              );
            });
            this.products = search;
            console.log(search);

          }, error: (error) => console.log(error)

        }
      )
    }


  }



  navigateDetails(id: number) {

    this.router.navigate(['product-details', id,this.productCategory]);

  }


  addCart(product: any) {
    this.cartService.addItem(1,this.productCategory ,product).subscribe(
      {
        next: (res) => {
          console.log('addCart', res);
        },
        error: (error) => {

          if (error.status == 0) {
            this.toastr.error('Server problem. Please contact the authorized person.');
          }
          if (error.status == 500) {
            this.toastr.info('Item added to cart successfully');

          }
          console.log(error.status);



        }
      }
    )

  }

  isChange = false;
  display() {
    this.isChange = !this.isChange;
  }



  //sdfkuhsdhkfsjhdfjsghrhkjsguhrkju
  ///dfhkujvhsdljg
  //dsfhkudsjgskg
  //dskufhks,fgkujs

  async getAllCategories() {
    try {
      const res = await this.productService.getAllCategories().toPromise();
      if(res){
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
