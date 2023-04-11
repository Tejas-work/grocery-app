import { Component, AfterViewInit } from '@angular/core';
import { GroceriesService } from 'src/app/shared/services/groceries.service';
import { Grocery } from 'src/app/shared/models/grocery.model';
import { Category } from '../../models/category.model';
import { ProductsService } from '../../services/products.service';

@Component({
  selector: 'app-explore-categories',
  templateUrl: './explore-categories.component.html',
  styleUrls: ['./explore-categories.component.css']
})
export class ExploreCategoriesComponent {
  groceries:Grocery[] = [];
  categories: Category[] = []
 groceryCountByCategory: { [key: string]: number } = {};
  constructor(private groceriesService: GroceriesService, private productService:ProductsService) { }

  ngOnInit() {
    //All Categories
    this.groceries = this.groceriesService.getGroceryList();
    this.getAllCategories();

    //count groceries by categories
    this.groceryCountByCategory=this.groceriesService.countGroceriesByCategories;
    console.log(typeof(this.groceryCountByCategory));

    console.log(this.groceryCountByCategory);
  }


  getAllCategories(){
    this.productService.getAllCategories().subscribe(
      {
        next:(res)=>{
          if (res?.data) {
            console.log(res);

            this.categories = res.data;
            console.log(this.categories);
          }

        }
      }
    );
  }

 


}
