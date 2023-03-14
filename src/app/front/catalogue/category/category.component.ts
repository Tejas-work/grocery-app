import { Component, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GroceriesService } from 'src/app/groceries.service';
import { Grocery } from 'src/app/grocery.model';
@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent {
  groceries:Grocery[] =[];
 brands:string[]=[];
  groceryCategory:string ="";
constructor(private groceriesService:GroceriesService,private route:ActivatedRoute, private router: Router){};
selectedBrands: string[] = [];

ngOnInit() {
  window.scrollTo(0,0);

  this.route.params.subscribe(params => {

    this.groceryCategory = params['category'];
  })
  this.groceries=this.groceriesService.getGroceriesByCategory(this.groceryCategory);
  this.brands = this.groceriesService.getGroceriesBrand();
}
onBrandChecked(event: any) {
  if (event.target.checked) {
    const brandValue = event.target.value;
    this.selectedBrands.push(brandValue);
  } else {
    const brandValue = event.target.value;
    const index = this.selectedBrands.indexOf(brandValue);
    if (index > -1) {
      this.selectedBrands.splice(index, 1);
    }
  }

}
ngOnChanges(){
  console.log("change");
}


ischange = false;
  display(){
    this.ischange =!this.ischange;
  }

}
