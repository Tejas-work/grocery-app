import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartComponent } from './cart/cart.component';
import { CatalogueModule } from '../catalogue/catalogue.module';
import { CheckOutComponent } from './check-out/check-out.component';
import { SuccessComponent } from './success/success.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxSpinnerModule } from 'ngx-spinner';
import { LocalCartService } from 'src/app/shared/services/local-cart.service';
@NgModule({
  declarations: [
    CartComponent,
    CheckOutComponent,
    SuccessComponent
  ],
  imports: [
    CommonModule,
    CatalogueModule,
    FormsModule,
    ReactiveFormsModule,
    NgxSpinnerModule.forRoot({ type: 'ball-scale-multiple' })

  ],
 
  exports:[CartComponent]
})
export class CartModule { }
