import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { GrocerySectionComponent } from './front/catalogue/grocery-section/grocery-section.component';
import { CategoryComponent } from './front/catalogue/category/category.component';
import { ProductDetailsComponent } from './front/catalogue/product-details/product-details.component';
import { CartComponent } from './front/catalogue/cart/cart.component';
import { CheckOutComponent } from './front/check-out/check-out.component';
import { SuccessComponent } from './front/success/success.component';

const routes: Routes = [
  {
    path:'',
    component:HomeComponent
  },
  {
    path:'search-groceries/:category/:word',
    component:CategoryComponent
  },
  {
    path: 'grocery-category/:category',
    component: CategoryComponent
  },
  {
    path: 'grocery-category/All/groceries-brand/All/:brand',
    component: CategoryComponent
  },
  {
    path:'product-details/:id',
    component:ProductDetailsComponent
  },{
    path:'cart',
    component:CartComponent
  },
  {
    path:'checkOut',
    component:CheckOutComponent
  },
  {
    path:'success',
    component:SuccessComponent
  }






];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
