import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AddAddress } from 'src/app/shared/models/addAddress.model';
import { AuthService } from 'src/app/shared/services/auth.service';
import { FormService } from 'src/app/shared/services/form.service';

@Component({
  selector: 'app-add-address',
  templateUrl: './add-address.component.html',
  styleUrls: ['./add-address.component.css']
})
export class AddAddressComponent {


  addAddressForm!: FormGroup;
  countries: [] = [];

  constructor(private fb: FormBuilder, private authService: AuthService, private formService: FormService) {
    formService.getCountries().subscribe({
      next: (res) => {
        // console.log(res);

        // Extract the name property from each object in the array
        this.countries = res.map((obj: any) => [obj.name.common,obj.cca2]);
        this.countries.sort();
        // console.log(this.countries);
      }, error: (error) => {
        console.log(error);

      }

    });


    //get stats

    // formService.getStates('IN').subscribe(
    //   {
    //     next:(res)=>{
    //       console.log(res);

    //     },
    //     error:(error)=>console.log(error)

    //   }
    // )
  }
  ngOnInit(){
      this.addAddressForm = this.fb.group(
        {
          addressOne: ['', Validators.required],
          addressTwo: ['', Validators.required],
          area: ['', Validators.required],
          city: ['', Validators.required],
          state: ['', Validators.required],
          country: ['IN', Validators.required],
          postal_code: ['', [Validators.required, Validators.minLength(6)]],
          landmark: ['', Validators.required],
          tag: ['', Validators.required],
        }
      )
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

      //call add address api
      this.authService.addAddress(data).subscribe({
        next: (res) => {
          console.log(res + "addaddress from component");
        },
        error: (error) => console.error(error)
      });
    }


}
