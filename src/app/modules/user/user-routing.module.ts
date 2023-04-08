import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProfileComponent } from './profile/profile.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { OrdersComponent } from './orders/orders.component';
import { ManageAddressesComponent } from './manage-addresses/manage-addresses.component';
import { AddAddressComponent } from './add-address/add-address.component';
import { AuthGuard } from 'src/app/shared/guards/auth.guard';

const routes: Routes = [
  {
    path: '',
    component:DashboardComponent,
   canActivate:[AuthGuard],
    children: [
      {
        path: '',
        redirectTo: 'profile',
        pathMatch: 'full',
      },
      {
        path: 'profile',
        component: ProfileComponent,

      },
      {
        path: 'changePassword',
        component: ChangePasswordComponent
      },
      {
        path: 'orders',
        component: OrdersComponent
      },
      {
        path:'manageAddresses',
        component:ManageAddressesComponent
      },
      {
        path:'addAddress',
        component:AddAddressComponent
      },
      {
        path:'addAddress/:id',
        component:AddAddressComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
