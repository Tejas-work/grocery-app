import { Component } from '@angular/core';
import { GroceriesService } from '../groceries.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  categories:string[]=['']
  constructor(private groceriesService:GroceriesService){}

  ngOnInit(){
    this.categories=this.groceriesService.getCategories();
  }


}
