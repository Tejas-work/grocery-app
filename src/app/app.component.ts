import { Component, HostListener } from '@angular/core';
import { WindowService } from './shared/services/window.service';
import { AuthService } from './shared/services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {




  title = 'grocery-app';
  constructor(private windowCloseService: WindowService, private authService: AuthService,) {


  }
  ngOnInit() {
    window.scrollTo(0, 0);
    // window.addEventListener('beforeunload', (event:any) => {

    //   if (event.clientY < 0) {

    //     this.authService.logOut();
    //   }

    //   else if (event.persisted || (window.performance && performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming).type === 'reload') {
    //    console.log("refresh");

    //   }

    //   else {
    //     console.log("navigate");


    //   }
    // });


    if (sessionStorage.getItem('token')) {
      this.windowCloseService.beforeUnloadEvent$().subscribe((event) => {
        // Do something when the user closes the tab

        this.authService.logOut();
        console.log('Tab closed');
      });
    }
  }










}


