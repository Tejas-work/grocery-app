import { Component, Input, OnChanges } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GroceriesService } from 'src/app/groceries.service';
import { Grocery } from 'src/app/grocery.model';
@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent {
  groceries: Grocery[] = [];
  brands: string[] = [];
  groceryCategory: string = "";
  selectedBrands: string[] = [];

  constructor(private groceriesService: GroceriesService, private route: ActivatedRoute, private router: Router) { };



  ngOnInit() {
    window.scrollTo(0, 0);

    this.route.params.subscribe(params => {

      this.groceryCategory = params['category'];
    })
    this.groceries = this.groceriesService.getGroceriesByCategory(this.groceryCategory);
    this.brands = this.groceriesService.getGroceriesBrand();
  }
  onBrandChecked(event: any) {
    const brandValue = event.target.value;
    if (event.target.checked) {

      this.selectedBrands.push(brandValue);

    }else{
     const index =this.selectedBrands.indexOf(brandValue)
     if(index != -1){
      this.selectedBrands.splice(index,1);
     }
    }
    console.log(this.selectedBrands);

    this.selectedBrands.filter((item,index) => {
      this.groceries.includes(item);
    })
  }
  ngOnChanges() {
    console.log("change");
  }


  ischange = false;
  display() {
    this.ischange = !this.ischange;
  }

}
