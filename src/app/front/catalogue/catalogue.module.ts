import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CatalogueRoutingModule } from './catalogue-routing.module';
import { CategoryComponent } from './category/category.component';
import { ProductListComponent } from './product-list/product-list.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { ExploreCategoriesComponent } from './explore-categories/explore-categories.component';
import { FeaturedProductComponent } from './featured-product/featured-product.component';
import { TrendingItemsComponent } from './trending-items/trending-items.component';


@NgModule({
  declarations: [
    CategoryComponent,
    ProductListComponent,
    ProductDetailsComponent,
    ExploreCategoriesComponent,
    FeaturedProductComponent,
    TrendingItemsComponent
  ],
  imports: [
    CommonModule,
    CatalogueRoutingModule
  ],exports:[
    CategoryComponent,
    ProductListComponent,
    ProductDetailsComponent,
    ExploreCategoriesComponent,
    FeaturedProductComponent,
    TrendingItemsComponent
  ]
})
export class CatalogueModule { }
