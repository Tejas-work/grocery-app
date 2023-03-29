import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategoryComponent } from './category/category.component';

const routes: Routes = [
  {
    path:'groceries',
    children:[
      {
        path:':category/:word',
        component:CategoryComponent
      },
      {
        path:':category',
        component:CategoryComponent
      },
      {
        path:':category/:brand',
        component:CategoryComponent
      }
    ]


  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CatalogueRoutingModule { }
