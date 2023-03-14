import { Component, Input } from '@angular/core';
import { GroceriesService } from 'src/app/groceries.service';
import { Grocery } from 'src/app/grocery.model';
@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent{
  groceries:Grocery[] =[];
  @Input() category:string = "";
  constructor(private groceriesService:GroceriesService){}

  ngOnInit(){
    this.groceries=this.groceriesService.getGroceriesByCategory(this.category);
  }


}
