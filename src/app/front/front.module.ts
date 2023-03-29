import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FrontRoutingModule } from './front-routing.module';
import { CheckOutComponent } from '../modules/cart/check-out/check-out.component';
import { SuccessComponent } from '../modules/cart/success/success.component';


@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    FrontRoutingModule
  ]
})
export class FrontModule { }
