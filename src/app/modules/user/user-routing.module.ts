import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProfileComponent } from './profile/profile.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { OrdersComponent } from './orders/orders.component';
import { ManageAddressesComponent } from './manage-addresses/manage-addresses.component';

const routes: Routes = [
  {
    path: '',
    component:DashboardComponent,
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
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
