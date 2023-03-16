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
  groceryCategory: string | undefined;
  word:string|undefined;
  selectedBrands: string[] = [];

  constructor(private groceriesService: GroceriesService, private route: ActivatedRoute, private router: Router) { };



  ngOnInit() {
    //start top
    window.scrollTo(0, 0);


    //get category from route and get data
    this.route.params.subscribe(params => {

      this.groceryCategory = params['category'];
      this.word = params['word'];
      if(this.groceryCategory){
        this.groceries = this.groceriesService.getGroceriesByCategory(this.groceryCategory);
        this.brands = this.groceriesService.getGroceriesBrand(this.groceryCategory);

      }
      if(this.word){
        this.groceries=this.groceriesService.getGroceriesBySearchWord(this.word)
      }

    })


  }



  //filter
  onBrandChecked(event:any) {


    //check brands add
    const brandValue = event.target.value;
    if (event.target.checked) {

      this.selectedBrands.push(brandValue);

    }
    //unchecked brand remove
    else {
      const index = this.selectedBrands.indexOf(brandValue)
      if (index != -1) {
        this.selectedBrands.splice(index, 1);
      }
    }
    console.log(this.selectedBrands);

    if(this.groceryCategory){
      this.getFilterData(this.groceryCategory)
    }

  }
  getFilterData(category:string){
    const duplicateGroceries = this.groceriesService.getGroceriesByCategory(category);
    //filter using brands
    if (this.selectedBrands && this.selectedBrands.length > 0) {

      this.groceries = duplicateGroceries.filter((grocery) => {

        return this.selectedBrands.includes(grocery.store);
      })
      console.log(this.groceries);
    } else {
      this.groceries = this.groceriesService.getGroceriesByCategory(category);
    }
  }



  ngOnChanges() {
    console.log("change");
  }


  ischange = false;
  display() {
    this.ischange = !this.ischange;
  }

}
