import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from 'src/app/shared/services/cart.service';

@Component({
  selector: 'app-check-out',
  templateUrl: './check-out.component.html',
  styleUrls: ['./check-out.component.css']
})
export class CheckOutComponent {
  constructor(private router:Router,private cartService:CartService) {

  }
success() {
  this.cartService.clearCart();
this.router.navigate(['success']);

}
cancel() {
  this.router.navigate(['']);
}

}
