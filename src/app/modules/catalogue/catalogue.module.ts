import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CatalogueRoutingModule } from './catalogue-routing.module';
import { CategoryComponent } from './category/category.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { FormsModule } from '@angular/forms';
import { ProductHeaderComponent } from 'src/app/shared/components/product-header/product-header.component';
import { ProductsService } from 'src/app/shared/services/products.service';
import { NgxSpinnerModule } from "ngx-spinner";




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
    NgxSpinnerModule.forRoot({ type: 'ball-scale-multiple' })


  ],exports:[
    CategoryComponent,
    ProductDetailsComponent,
    ProductHeaderComponent
  ],
  providers:[ProductsService]
})
export class CatalogueModule { }
