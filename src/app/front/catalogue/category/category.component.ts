import { Component} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CartService } from 'src/app/cart.service';
import { GroceriesService } from 'src/app/groceries.service';
import { Grocery } from 'src/app/grocery.model';
@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css'],
})
export class CategoryComponent {

  groceries: Grocery[] = [];
  total:number=0;
  duplicate:Grocery[]=[]
  brands: string[] = [];
  groceryCategory: string ='';
  word: string | undefined;
  selectedBrands: string[] = [];
  brand: string='';
  

  constructor(
    private groceriesService: GroceriesService,
    private cartService: CartService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    //start top
    window.scrollTo(0, 0);

    //get category from route and get data
    this.route.params.subscribe((params) => {

      this.groceryCategory = params['category'];
      this.word = params['word'];
      this.brand = params['brand'];

      if(this.brand){
        this.getGroceriesByBrandData(this.brand);
        }


     else if (this.word && this.groceryCategory) {
        this.getSearchCategoryData(this.groceryCategory, this.word);

      }
      else if (this.groceryCategory) {
        this.getGroceriesByCategoryData(this.groceryCategory);
      }
    });
  }

  // Function to get data for search category
getSearchCategoryData(category: string, word: string) {
  this.groceries = this.groceriesService.getSearchCategory(category, word);
  this.duplicate = this.groceriesService.getSearchCategory(category, word);
  if (this.groceries && this.groceries.length > 0) {
    this.updateBrandAndTotal=this.groceries;
  }
}

// Function to get data for groceries by category
getGroceriesByCategoryData(category: string) {
  this.groceries = this.groceriesService.getGroceriesByCategory(category);
  this.duplicate = this.groceriesService.getGroceriesByCategory(category);
  if (this.groceries && this.groceries.length > 0) {
    this.updateBrandAndTotal=this.groceries;
  }

}

getGroceriesByBrandData(brand:string){
  this.groceries = this.groceriesService.getGroceriesByBrand(brand);
  this.duplicate = this.groceriesService.getGroceriesByBrand(brand);
  if (this.groceries && this.groceries.length > 0) {
    this.updateBrandAndTotal=this.groceries;
  }


}

set updateBrandAndTotal(groceries:Grocery[]){
  this.brands = this.groceriesService.getGroceriesBrand(groceries);
  this.total=groceries.length;
}

  //filter
  onBrandChecked(event: Event) {
    //check brands add
    console.log(event);
    const brandElement = event.target as HTMLInputElement;
    const brandValue = brandElement.value;
    if (brandElement.checked) {
      this.selectedBrands.push(brandValue);
    }
    //unchecked brand remove
    else {
      const index = this.selectedBrands.indexOf(brandValue);
      if (index != -1) {
        this.selectedBrands.splice(index, 1);
      }
    }
    console.log(this.selectedBrands);

    if (this.groceryCategory) {
      this.getFilterData();
    }
  }


  getFilterData() {
    //filter using brands
    if (this.selectedBrands && this.selectedBrands.length > 0) {
      this.groceries = this.duplicate.filter((grocery) => {
        return this.selectedBrands.includes(grocery.store);
      });
      console.log(this.groceries);
    } else {
      this.groceries = this.duplicate;
    }
  }

  ngOnChanges() {
    console.log('change');
  }

  navigateDetails(id: number) {

    this.router.navigate(['product-details',id]);

  }


  addCart(grocery:Grocery) {
    this.cartService.addItem(1,grocery).subscribe(
      {
        next:(res)=>{
          console.log('addCart',res);
        },
        error:(error)=>{
          console.log(error);
        }
      }
    )
    this.router.navigate(['cart']);
    }

  isChange = false;
  display() {
    this.isChange = !this.isChange;
  }


}
