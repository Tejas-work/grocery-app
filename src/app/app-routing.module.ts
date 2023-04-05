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

const routes: Routes = [
  {
    path:'',
    component:HomeComponent
  },

  {
    path:'product-details/:id',
    component:ProductDetailsComponent
  },{
    path:'cart',
    component:CartComponent
  },
  {
    path:'checkOut',
    component:CheckOutComponent
  },
  {
    path:'success',
    component:SuccessComponent
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
