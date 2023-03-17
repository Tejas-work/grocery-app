import { Injectable } from '@angular/core';
import { Grocery } from './grocery.model';
@Injectable({
  providedIn: 'root'
})
export class GroceriesService {
  groceryList:Grocery[] = [
    {
      id: 1,
      grocery_name: "Bananas",
      store: "ABC Supermarket",
      price: 0.49,
      discountPrice: null,
      rating: 4.2,
      quantity: "1 lb",
      category: "Fruits",
      imageUrl:"assets/Rectangle 19.png"
    },
    {
      id: 2,
      grocery_name: "Chicken Breast",
      store: "XYZ Grocery",
      price: 5.99,
      discountPrice: 4.99,
      rating: 4.5,
      quantity: "1 lb",
      category: "Meat",
      imageUrl:"assets/Rectangle 19.png"
    },
    {
      id: 3,
      grocery_name: "Carrots",
      store: "123 Market",
      price: 0.99,
      discountPrice: null,
      rating: 3.9,
      quantity: "1 lb",
      category: "Vegetables",
      imageUrl:"assets/Rectangle 19.png"
    },
    {
      id: 4,
      grocery_name: "Apples",
      store: "ABC Supermarket",
      price: 1.29,
      discountPrice: null,
      rating: 4.1,
      quantity: "1 lb",
      category: "Fruits",
      imageUrl:"assets/Rectangle 19.png"
    },
    {
      id: 5,
      grocery_name: "Salmon Fillet",
      store: "XYZ Grocery",
      price: 9.99,
      discountPrice: null,
      rating: 4.3,
      quantity: "1 lb",
      category: "Meat",
      imageUrl:"assets/Rectangle 19.png"
    },
    {
      id: 6,
      grocery_name: "Cucumbers",
      store: "123 Market",
      price: 1.49,
      discountPrice: null,
      rating: 3.8,
      quantity: "1 lb",
      category: "Vegetables",
      imageUrl:"assets/Rectangle 19.png"
    },
    {
      id: 7,
      grocery_name: "Oranges",
      store: "ABC Supermarket",
      price: 0.99,
      discountPrice: 0.79,
      rating: 4.0,
      quantity: "1 lb",
      category: "Fruits",
      imageUrl:"assets/Rectangle 19.png"
    },
    {
      id: 8,
      grocery_name: "Ground Beef",
      store: "XYZ Grocery",
      price: 6.99,
      discountPrice: null,
      rating: 4.2,
      quantity: "1 lb",
      category: "Meat",
      imageUrl:"assets/Rectangle 19.png"
    },
    {
      id: 9,
      grocery_name: "Broccoli",
      store: "123 Market",
      price: 1.99,
      discountPrice: null,
      rating: 3.9,
      quantity: "1 lb",
      category: "Vegetables",
      imageUrl:"assets/Rectangle 19.png"
    },
    {
      id: 10,
      grocery_name: "Grapes",
      store: "ABC Supermarket",
      price: 2.99,
      discountPrice: null,
      rating: 4.3,
      quantity: "1 lb",
      category: "Fruits",
      imageUrl:"assets/Rectangle 19.png"
    },
      {
        id: 11,
        grocery_name: "Sweet Potatoes",
        store: "Fresh Foods",
        price: 1.99,
        discountPrice: null,
        rating: 4.5,
        quantity: "1 lb",
        category: "Vegetables",
        imageUrl:"assets/Rectangle 19.png"
      },
      {
        id: 12,
        grocery_name: "Blueberries",
        store: "SuperMart",
        price: 2.99,
        discountPrice: null,
        rating: 4.1,
        quantity: "1 lb",
        category: "Fruits",
        imageUrl:"assets/Rectangle 19.png"
      },
      {
        id: 13,
        grocery_name: "Beef Ribeye Steak",
        store: "Meat King",
        price: 12.99,
        discountPrice: 9.99,
        rating: 4.8,
        quantity: "1 lb",
        category: "Meat",
        imageUrl:"assets/Rectangle 19.png"
      },
      {
        id: 14,
        grocery_name: "Asparagus",
        store: "Fresh Foods",
        price: 2.49,
        discountPrice: null,
        rating: 4.3,
        quantity: "1 lb",
        category: "Vegetables",
        imageUrl:"assets/Rectangle 19.png"
      },
      {
        id: 15,
        grocery_name: "Strawberries",
        store: "SuperMart",
        price: 3.49,
        discountPrice: null,
        rating: 4.2,
        quantity: "1 lb",
        category: "Fruits",
        imageUrl:"assets/Rectangle 19.png"
      },
      {
        id: 16,
        grocery_name: "Pork Loin Roast",
        store: "Meat King",
        price: 8.99,
        discountPrice: null,
        rating: 4.0,
        quantity: "1 lb",
        category: "Meat",
        imageUrl:"assets/Rectangle 19.png"
      },
      {
        id: 17,
        grocery_name: "Spinach",
        store: "Fresh Foods",
        price: 1.99,
        discountPrice: null,
        rating: 4.1,
        quantity: "1 lb",
        category: "Vegetables",
        imageUrl:"assets/Rectangle 19.png"
      },
      {
        id: 18,
        grocery_name: "Pineapple",
        store: "SuperMart",
        price: 2.99,
        discountPrice: null,
        rating: 4.4,
        quantity: "1 lb",
        category: "Fruits",
        imageUrl:"assets/Rectangle 19.png"
      },
      {
        id: 19,
        grocery_name: "Salmon Fillet",
        store: "Fish Market",
        price: 10.99,
        discountPrice: null,
        rating: 4.5,
        quantity: "1 lb",
        category: "Meat",
        imageUrl:"assets/Rectangle 19.png"
      },
      {
        id: 20,
        grocery_name: "Bell Peppers",
        store: "Fresh Foods",
        price: 1.49,
        discountPrice: null,
        rating: 4.0,
        quantity: "1 lb",
        category: "Vegetables",
        imageUrl:"assets/Rectangle 19.png"
      }
    ];



    categories: Set<string> = new Set<string>(['All']);



    getGrocery(){
      return this.groceryList;
    }


    getCategories(): string[] {
      this.groceryList.forEach((grocery: Grocery) => {
        this.categories.add(grocery.category);
      });

      return Array.from(this.categories);
    }

    getGroceriesBrand(data:Grocery[]){
     let brands:Set<string> = new Set<string>();

      // if(category=='All'){
      //  this.groceryList.forEach((grocery: Grocery) => {

      //     brands.add(grocery.store);
      //   });
      // }else{
      //   this.groceryList.forEach((grocery: Grocery) => {
      //     if(grocery.category==category){
      //       brands.add(grocery.store);
      //     }
      //   });
      // }
      data.forEach((grocery: Grocery) => {

        brands.add(grocery.store);
      });
      return Array.from(brands);

    }



    getGroceriesByCategory(category:string)
    {
      if(category&&category!='All'){
        return this.groceryList.filter(grocery => grocery.category === category );
      }

      return this.groceryList;

    }

    getTopRatedGroceries(){
      let topRated = this.groceryList.sort((a,b)=>{
       return a.rating-b.rating
      })
      return topRated.slice(0,4);

    }

    getGroceriesBySearchWord(word:string){
      console.log(word);
     let search= this.groceryList.filter((grocery)=>{

        return grocery.grocery_name.indexOf(word)!=-1
      })
      console.log(search);
      return search;
    }

    getSearchCategory(category:string,word:string){
      let matchCategoryData = this.getGroceriesByCategory(category);
      let search = matchCategoryData.filter((grocery)=>{
        return grocery.grocery_name.toLowerCase().indexOf(word.toLowerCase())!=-1
      })
      console.log(search);
      return search;
    }

    get countGroceriesByCategories():{ [key: string]: number }{

      let groceryCountByCategory: { [key: string]: number } = {};
      let categories = this.getCategories();
      for (const category of this.categories) {
        const groceries = this.getGroceriesByCategory(category);
        groceryCountByCategory[category] = groceries.length;
      }
      return groceryCountByCategory;

    }

  constructor() { }
}
