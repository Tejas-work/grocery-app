import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { CartService } from '../services/cart.service';
import { LocalCartService } from '../services/local-cart.service';

@Injectable({
  providedIn: 'root'
})
export class CartGuard implements CanActivate {

  check: boolean = false;
  cartItemsCount: number=0;
  constructor(private cartService: LocalCartService, private router: Router) {
    cartService.cartCheck$.subscribe({
      next: (res) => {
        if (res) {
          this.check = res;
        }
      }
    })
    this.cartService.items$.subscribe((res) => {
      console.log('here');
      console.log(res.length);

      this.cartItemsCount = res.length;
    });
  }

  canActivate(
    _next: ActivatedRouteSnapshot,
    _state: RouterStateSnapshot): boolean {
    if (this.check) {
      return true;
    } else {
      this.router.navigate(['']);
      return false;
    }
  }

}
