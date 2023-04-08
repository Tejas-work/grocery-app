import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CatalogueRoutingModule } from './catalogue-routing.module';
import { CategoryComponent } from './category/category.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { FormsModule } from '@angular/forms';
import { ProductHeaderComponent } from 'src/app/shared/components/product-header/product-header.component';
import { ProductsService } from 'src/app/shared/services/products.service';





@NgModule({
  declarations: [
    CategoryComponent,
    ProductDetailsComponent,
    ProductHeaderComponent
  ],
  imports: [
    CommonModule,
    CatalogueRoutingModule,
    FormsModule,


  ],exports:[
    CategoryComponent,
    ProductDetailsComponent,
    ProductHeaderComponent
  ],
  providers:[ProductsService]
})
export class CatalogueModule { }
