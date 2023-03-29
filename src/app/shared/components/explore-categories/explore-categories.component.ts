import { Component, AfterViewInit } from '@angular/core';
import { GroceriesService } from 'src/app/shared/services/groceries.service';
import { Grocery } from 'src/app/shared/models/grocery.model';

@Component({
  selector: 'app-explore-categories',
  templateUrl: './explore-categories.component.html',
  styleUrls: ['./explore-categories.component.css']
})
export class ExploreCategoriesComponent {
  groceries:Grocery[] = [];
  categories: string[] = ['']
 groceryCountByCategory: { [key: string]: number } = {};
  constructor(private groceriesService: GroceriesService) { }

  ngOnInit() {
    //All Categories
    this.groceries = this.groceriesService.getGroceryList();
    this.categories = this.groceriesService.getCategories();

    //count groceries by categories
    this.groceryCountByCategory=this.groceriesService.countGroceriesByCategories;
    console.log(typeof(this.groceryCountByCategory));

    console.log(this.groceryCountByCategory);
  }


  ngAfterViewInit() {

  }


}
