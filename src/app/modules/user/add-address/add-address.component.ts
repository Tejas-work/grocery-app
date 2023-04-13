import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { AddAddress } from 'src/app/shared/models/addAddress.model';
import { AuthService } from 'src/app/shared/services/auth.service';


@Component({
  selector: 'app-add-address',
  templateUrl: './add-address.component.html',
  styleUrls: ['./add-address.component.css']
})
export class AddAddressComponent {

  @Output() pageTitleChanged = new EventEmitter<string>();
  pageTitle = 'Add Address';
  addAddressForm!: FormGroup;
  countries: [] = [];
  encryptId:string=''
  id:number=0


  constructor(private fb: FormBuilder, private authService: AuthService,private route:ActivatedRoute,private router:Router) {

    this.addAddressForm = this.fb.group(
      {
        addressOne: ['', Validators.required],
        addressTwo: ['', Validators.required],
        area: ['', Validators.required],
        city: ['', Validators.required],
        state: ['', Validators.required],
        country: ['', Validators.required],
        postal_code: ['', [Validators.required, Validators.minLength(6)]],
        landmark: ['', Validators.required],
        tag: ['', Validators.required],
      }
    )

    this.route.params.subscribe((res)=>{
      this.encryptId=res['id'];

      if(this.encryptId){
       this.displayAddress();
      }

    })





  }
  ngOnInit(){
    this.pageTitleChanged.emit(this.pageTitle);

    }


  get addressOne(){
      return this.addAddressForm.get('addressOne')
    }
  get addressTwo(){
      return this.addAddressForm.get('addressTwo')
    }
  get area(){
      return this.addAddressForm.get('area')
    }
  get city(){
      return this.addAddressForm.get('city')
    }
  get state(){
      return this.addAddressForm.get('state')
    }
  get country(){
      return this.addAddressForm.get('country')
    }
  get postal_code(){
      return this.addAddressForm.get('postal_code')
    }
  get landmark(){
      return this.addAddressForm.get('landmark')
    }
  get tag(){
      return this.addAddressForm.get('tag')
    }



  //address onsubmit
  onSubmit() {
      console.log(this.addAddressForm.getRawValue());
      const data: AddAddress = {
        address_line_1: this.addressOne?.value,
        address_line_2: this.addressTwo?.value,
        area: this.area?.value,
        city: this.city?.value,
        state: this.state?.value,
        country: this.country?.value,
        postal_code: this.postal_code?.value,
        landmark: this.landmark?.value,
        tag: this.tag?.value
      };




      if(this.encryptId){
        this.updateAddress(data);
      }else{
        this.addAddress(data);
      }
    }

    addAddress(data:any){

      //call add address api
      this.authService.addAddress(data).subscribe({
        next: (res) => {
          console.log(res + "addaddress from component");
        },
        error: (error) => console.error(error)
      });

    }
    updateAddress(data:any){

      this.authService.updateAddress(data,this.encryptId,this.id).subscribe(
        {
          next:(res)=>{
            console.log(res);


            this.router.navigate(['users/manageAddresses'])

          },
          error:(error)=>console.log(error)

        }
      )

    }



  displayAddress() {

    this.authService.address$.subscribe({
      next:(res)=>{

        this.id=res.id
        console.log(res);



        this.addAddressForm.patchValue({
          addressOne: res.address_line_1,
          addressTwo: res.address_line_2,
          area: res.area,
          city: res.city,
          state: res.state,
          country: res.country,
          postal_code: res.postal_code,
          landmark: res.landmark,
          tag: res.tag,
        });

      }
    })

    }


}

