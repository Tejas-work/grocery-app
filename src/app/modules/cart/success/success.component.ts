import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LocalCartService } from 'src/app/shared/services/local-cart.service';

@Component({
  selector: 'app-success',
  templateUrl: './success.component.html',
  styleUrls: ['./success.component.css'],
})
export class SuccessComponent {
  home() {
    this.cartService.cartCheck.next(false)
  this.router.navigate(['']);
}
  constructor(private router: Router,private cartService: LocalCartService) {}

  ngOnInit() {

  }
}
