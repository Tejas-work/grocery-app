import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { GrocerySectionComponent } from './front/catalogue/grocery-section/grocery-section.component';
import { CategoryComponent } from './front/catalogue/category/category.component';

const routes: Routes = [
  {
    path:'',
    component:HomeComponent
  },
  {
    path: 'grocery-category/:category',
    component: CategoryComponent
  }


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
