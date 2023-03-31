import { HttpResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Register } from 'src/app/shared/models/register.model';

import { AuthService } from 'src/app/shared/services/auth.service';
import { matchPassword } from 'src/app/shared/validators /matchPassword.validator';
@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent {
  status:any;
  message:string='';
  field:string='';
  registrationForm!: FormGroup

  constructor(private fb: FormBuilder,private authService:AuthService,private router:Router) {
    this.registrationForm = this.fb.group({
      firstName: ['', Validators.required],
      username: ['', Validators.required],
      lastName: ['', Validators.required],
      primary_email: ['', [Validators.required, Validators.email]],
      primary_mobile_number: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(10), Validators.pattern(/^[0-9]+$/)]],
      password: ['', [Validators.required, Validators.minLength(1)]],
      rePassword: ['', [Validators.required, Validators.minLength(1)]]
    },
      {
        validators: matchPassword('password', 'rePassword')
      }

    )


  }

  ngOnInit() {
  }

  get firstName() {
    return this.registrationForm.get('firstName')
  }
  get username() {
    return this.registrationForm.get('username')
  }
  get lastName() {
    return this.registrationForm.get('lastName')
  }
  get primary_mobile_number() {


    return this.registrationForm.get('primary_mobile_number')
  }
  get primary_email() {
    return this.registrationForm.get('primary_email');
  }
  get password() {
    return this.registrationForm.get('password');
  }
  get rePassword() {
    return this.registrationForm.get('rePassword');
  }



  onSubmit() {

    let user: Register = {
      first_name: this.firstName?.value,
      last_name: this.lastName?.value,
      primary_mobile_number: this.primary_mobile_number?.value,
      primary_email: this.primary_email?.value,
      username: this.username?.value,
      password: this.password?.value
    }

    console.log(user);
    this.authService.registration(user).subscribe(
      {
        next:(res)=>{
          console.log(res);
          this.message="Register Successfully";

          this.router.navigate(['/login']);


        },
        error:(error)=>{
          console.log(error);


         if(error.status!=400){
          this.message=error.error.error.errors[0].message;
          this.field=error.error.error.fields;

          // console.log(this.message);
          // console.log(Object.keys(this.field));
          // console.log(this.field);

          this.registrationForm.get(Object.keys(this.field)[0])?.setErrors({unique:true});
          // this.status=false
         }

         if(error.status==400){
          console.log(error.error.message,error.status);
          
          this.status=error.status
         }

        }

      }
    );


  }
onclick(){
  if(this.registrationForm.invalid){
    console.log(this.status);

    alert('oik');
  }
}
}
