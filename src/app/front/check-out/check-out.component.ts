import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-check-out',
  templateUrl: './check-out.component.html',
  styleUrls: ['./check-out.component.css']
})
export class CheckOutComponent {
  constructor(private router:Router) {

  }
success() {
this.router.navigate(['success']);
}
cancel() {
  this.router.navigate(['']);
}

}
