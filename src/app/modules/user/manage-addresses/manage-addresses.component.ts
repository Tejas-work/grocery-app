import { Component } from '@angular/core';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-manage-addresses',
  templateUrl: './manage-addresses.component.html',
  styleUrls: ['./manage-addresses.component.css']
})
export class ManageAddressesComponent {

  addresses:any;

  constructor(private authService:AuthService) {
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


  }

  ngOnInit(){

  }

}
