import { Component } from '@angular/core';
import { GroceriesService } from 'src/app/groceries.service';
import { Grocery } from 'src/app/grocery.model';
@Component({
  selector: 'app-trending-items',
  templateUrl: './trending-items.component.html',
  styleUrls: ['./trending-items.component.css']
})
export class TrendingItemsComponent {
  // Top rated Groceries
  topRated:Grocery[]=[];


  constructor(private groceriesService:GroceriesService){

  }

  ngOnInit(){
    this.topRated=this.groceriesService.getTopRatedGroceries();
  }

}
