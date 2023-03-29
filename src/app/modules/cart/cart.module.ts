import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartComponent } from './cart/cart.component';
import { CatalogueModule } from '../catalogue/catalogue.module';
import { CheckOutComponent } from './check-out/check-out.component';
import { SuccessComponent } from './success/success.component';
import { FormsModule } from '@angular/forms';
@NgModule({
  declarations: [
    CartComponent,
    CheckOutComponent,
    SuccessComponent
  ],
  imports: [
    CommonModule,
    CatalogueModule,
    FormsModule
  ],
  exports:[CartComponent]
})
export class CartModule { }
