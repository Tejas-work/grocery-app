import { Component } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {

title:any='Profile';
  constructor(private route:ActivatedRoute,private router: Router){

  }

  ngOnInit(){

    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        console.log('Navigation ended successfully:', event.url);
        const array = event.url.split('/');
        this.title = array.pop();
      }
    });



  }

}
