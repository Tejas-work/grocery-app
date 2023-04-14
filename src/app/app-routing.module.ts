import { NgModule, inject } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './shared/components/home/home.component';
import { ProductDetailsComponent } from './modules/catalogue/product-details/product-details.component';
import { CartComponent } from './modules/cart/cart/cart.component';
import { CheckOutComponent } from './modules/cart/check-out/check-out.component';
import { SuccessComponent } from './modules/cart/success/success.component';
import { SignUpComponent } from './modules/user/sign-up/sign-up.component';
import { LoginComponent } from './modules/user/login/login.component';
import { AuthGuard } from './shared/guards/auth.guard';
import { CartGuard } from './shared/guards/cart.guard';

const routes: Routes = [
  {
    path:'',
    component:HomeComponent
  },

  {
    path:'product-details/:id/:category',
    component:ProductDetailsComponent
  },{
    path:'cart',
    component:CartComponent,
    canActivate:[AuthGuard]

  },
  {
    path:'checkOut',
    component:CheckOutComponent,
    canActivate:[AuthGuard]
  },
  {
    path:'success',
    component:SuccessComponent,
    canActivate:[CartGuard]
  },{
    path:'users',loadChildren:()=>import('./modules/user/user.module').then(c => c.UserModule)

  }
  ,{
    path:'groceries',loadChildren:()=>import('./modules/catalogue/catalogue.module').then(c => c.CatalogueModule),
  },
  {
    path:"signUp",
    component:SignUpComponent
  },
  {
    path:"login",
    component:LoginComponent
  },{
    path:"**",
    component:HomeComponent
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
