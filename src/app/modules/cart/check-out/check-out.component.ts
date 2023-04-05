import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/services/auth.service';
import { CartService } from 'src/app/shared/services/cart.service';

@Component({
  selector: 'app-check-out',
  templateUrl: './check-out.component.html',
  styleUrls: ['./check-out.component.css']
})
export class CheckOutComponent {

  addresses:any;
  checkOutForm!:FormGroup

  constructor(private router:Router,private cartService:CartService,private authService:AuthService,private fb:FormBuilder) {
    this.authService.user$.subscribe(
      {
        next:(res)=>{
          console.log(res);

          this.addresses=res.addresses;
          console.log(this.addresses);

        },
        error:(error)=>console.log(error)

      }
    )


    this.checkOutForm=this.fb.group(
      {
        deliveryAddress:['',[Validators.required]]
      }
    )




  }


  get  deliveryAddress() {
    return this.checkOutForm.get('deliveryAddress');
  }
success() {
  this.cartService.clearCart();
this.router.navigate(['success']);

}
cancel() {
  this.router.navigate(['']);
}

}
