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
  addresses: any[]=[];
  checkOutForm!: FormGroup;
  cartItemsCount: number = 0;
  subTotal: number=0;
  gst: number=0;
  total: number=0;

  constructor(
    private router: Router,
    private cartService: LocalCartService,
    private authService: AuthService,
    private fb: FormBuilder,
    private spinner: NgxSpinnerService
  ) {}

  ngOnInit() {
    this.check();
    this.getAddress();
    this.formInitial();
    this.getCalculation()
  }

  formInitial() {
    this.checkOutForm = this.fb.group({
      deliveryAddress: ['', [Validators.required]],
    });
  }

  getAddress() {
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
      this.cartService.order(
        this.deliveryAddress?.value,
        this.deliveryAddress?.value
      );
      this.deliveryAddress?.setValue('');
    }
  }

  check() {
    this.cartService.items$.subscribe((res) => {
      if (!(res?.length > 0)) {
        this.router.navigate(['']);
      }
    });
  }

  cancel() {
    this.router.navigate(['']);
  }

  getCalculation() {
    this.cartService.items$.subscribe((items) => {

      this.subTotal = items.reduce(
        (total, item) => total + item.qty * item.product_amount,
        0
      );
      console.log(this.subTotal);
      this.gst = (this.subTotal * 18) / 100;
      this.total = this.subTotal + this.gst;
    });
  }
  addAddressNavigate() {
    this.router.navigate(['users/addAddress']);
    }
}
