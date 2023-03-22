import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FrontRoutingModule } from './front-routing.module';
import { CheckOutComponent } from './check-out/check-out.component';
import { SuccessComponent } from './success/success.component';


@NgModule({
  declarations: [
    CheckOutComponent,
    SuccessComponent
  ],
  imports: [
    CommonModule,
    FrontRoutingModule
  ]
})
export class FrontModule { }
