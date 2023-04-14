import { Component, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';
import { ConfirmBoxInitializer, DialogLayoutDisplay } from '@costlydeveloper/ngx-awesome-popup';
import { AddAddressResponse } from 'src/app/shared/models/Address.model';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-manage-addresses',
  templateUrl: './manage-addresses.component.html',
  styleUrls: ['./manage-addresses.component.css']
})
export class ManageAddressesComponent {
addAddressNavigate() {
this.router.navigate(['users/addAddress']);
}

  @Output() pageTitleChanged = new EventEmitter<string>();
  pageTitle = 'Manage Addresses';
  addresses:any[]=[];

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
  delete(id: number) {
    const confirmBox = new ConfirmBoxInitializer();
    confirmBox.setTitle('Are you sure?');
    confirmBox.setMessage('Do you want to Delete?');
    confirmBox.setButtonLabels('DELETE', 'NO');

    // Choose layout color type
    confirmBox.setConfig({
      layoutType: DialogLayoutDisplay.DANGER, // SUCCESS | INFO | NONE | DANGER | WARNING
    });

    // Simply open the popup and listen which button is clicked
    confirmBox.openConfirmBox$().subscribe((resp: any) => {
      // IConfirmBoxPublicResponse
      console.log('Clicked button response: ', resp);

      if (resp.success) {

        this.authService.deleteAddress(id);

      }
    })

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
