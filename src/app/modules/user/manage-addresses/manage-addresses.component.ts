import { Component, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-manage-addresses',
  templateUrl: './manage-addresses.component.html',
  styleUrls: ['./manage-addresses.component.css']
})
export class ManageAddressesComponent {

  @Output() pageTitleChanged = new EventEmitter<string>();
  pageTitle = 'Manage Addresses';
  addresses:any;

  constructor(private authService:AuthService,private router:Router) {
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
    this.pageTitleChanged.emit(this.pageTitle);

  }

//delete address
  delete(id:number) {
    this.authService.deleteAddress(id);
  }


  edit(id:number) {
    this.authService.encrypt(id).subscribe(
      {
        next:(res)=>{
          console.log(res.data);
          this.authService.getAddress(id);
          this.router.navigate(['users/addAddress',res.data]);
        }
      }
    )
    }


}
