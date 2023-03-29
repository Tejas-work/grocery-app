import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CatalogueRoutingModule } from './catalogue-routing.module';
import { CategoryComponent } from './category/category.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { ExploreCategoriesComponent } from '../../shared/components/explore-categories/explore-categories.component';
import { FeaturedProductComponent } from '../../shared/components/featured-product/featured-product.component';
import { TrendingItemsComponent } from '../../layout/trending-items/trending-items.component';
import { FormsModule } from '@angular/forms';
import { ProductHeaderComponent } from 'src/app/shared/components/product-header/product-header.component';


console.warn("cata");

@NgModule({
  declarations: [
    CategoryComponent,
    ProductDetailsComponent,
    ProductHeaderComponent
  ],
  imports: [
    CommonModule,
    CatalogueRoutingModule,
    FormsModule
  ],exports:[
    CategoryComponent,
    ProductDetailsComponent,
    ProductHeaderComponent
  ]
})
export class CatalogueModule { }
