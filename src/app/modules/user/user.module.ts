import { NgModule } from '@angular/core';
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
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AuthInterceptor } from 'src/app/shared/interceptor/auth.interceptor';
import { AddAddressComponent } from './add-address/add-address.component';
import { AuthGuard } from 'src/app/shared/guards/auth.guard';
import { LocalCartService } from 'src/app/shared/services/local-cart.service';
import { NgxSpinnerModule } from 'ngx-spinner';




@NgModule({
  declarations: [
    ProfileComponent,
    SidebarComponent,
    DashboardComponent,
    ChangePasswordComponent,
    OrdersComponent,
    ManageAddressesComponent,
    LoginComponent,
    SignUpComponent,
    AddAddressComponent
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    CatalogueModule,
    HttpClientModule,
    NgxSpinnerModule



  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }, AuthGuard,LocalCartService
  ],
  exports: [ProfileComponent, SidebarComponent]
})
export class UserModule { }
