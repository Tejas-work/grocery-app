import {  NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { ProfileComponent } from './profile/profile.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { OrdersComponent } from './orders/orders.component';
import { ManageAddressesComponent } from './manage-addresses/manage-addresses.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './login/login.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { CatalogueModule } from '../catalogue/catalogue.module';
import { HttpClient, HttpClientModule } from '@angular/common/http';

console.warn("usree");
@NgModule({
  declarations: [
    ProfileComponent,
    SidebarComponent,
    DashboardComponent,
    ChangePasswordComponent,
    OrdersComponent,
    ManageAddressesComponent,
    LoginComponent,
    SignUpComponent
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    CatalogueModule,
    HttpClientModule

  ],
  exports:[ProfileComponent,SidebarComponent]
})
export class UserModule { }
