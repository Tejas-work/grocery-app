import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {

profileForm!:FormGroup
  title: any;
  user:any;

  constructor(private fb:FormBuilder,private route:ActivatedRoute,private authService:AuthService) {

  }

  ngOnInit(){
    this.profileForm=this.fb.group({
      firstName:['',Validators.required],
      lastName:['',Validators.required],
      email:['',[Validators.required,Validators.email]],
      contact:['',[Validators.required,Validators.minLength(10),Validators.maxLength(10),Validators.pattern(/^[0-9]+$/)]],
      altEmail:['',Validators.required],
      altContact:['',Validators.required],
      dob:['',Validators.required]
    })
    this.title=this.route.snapshot.data['title'];

    this.authService.getUserDetails().subscribe({
      next:(res)=>{
        this.user=res;
        console.log("getUser component",res);

      },
      error:(error)=>{
        console.log("get user component",error);

      }
    })



  }

  get firstName(){
    return this.profileForm.get('firstName')
  }
  get lastName(){
    return this.profileForm.get('lastName')
  }
  get contact(){
    return this.profileForm.get('contact')
  }
  get email() {
    return this.profileForm.get('email');
  }
  get password() {
    return this.profileForm.get('password');
  }
  get rePassword() {
    return this.profileForm.get('rePassword');
  }
  get dob() {
    return this.profileForm.get('dob');
  }

}