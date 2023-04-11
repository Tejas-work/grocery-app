import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { AuthService } from 'src/app/shared/services/auth.service';
import { CartService } from 'src/app/shared/services/cart.service';
import { LocalCartService } from 'src/app/shared/services/local-cart.service';

@Component({
  selector: 'app-check-out',
  templateUrl: './check-out.component.html',
  styleUrls: ['./check-out.component.css'],
})
export class CheckOutComponent {
  addresses: any;
  checkOutForm!: FormGroup;

  constructor(
    private router: Router,
    private cartService:LocalCartService,
    private authService: AuthService,
    private fb: FormBuilder,
    private spinner: NgxSpinnerService
  ) {


    this.checkOutForm = this.fb.group({
      deliveryAddress: ['', [Validators.required]],
    });
  }

  ngOnInit(){
    this.getAddress();
  }



  getAddress(){
    this.spinner.show();

    this.authService.user$.subscribe({
      next: (res) => {
        console.log(res);

        this.addresses = res.addresses;
        console.log(this.addresses);
        this.spinner.hide();
      },
      error: (error) => console.log(error),
    });

  }

  get deliveryAddress() {
    return this.checkOutForm.get('deliveryAddress');
  }


  success() {
    if (this.checkOutForm.valid) {

      this.cartService.order(this.deliveryAddress?.value,this.deliveryAddress?.value);
      this.deliveryAddress?.setValue('');
    }
  }

  cancel() {
    this.router.navigate(['']);
  }
}
