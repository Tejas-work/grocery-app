
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  profileForm!: FormGroup;
  title: any;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.profileForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      altEmail: ['', Validators.email],
      altContact: ['', [Validators.minLength(10), Validators.maxLength(10), Validators.pattern(/^[0-9]+$/)]],
      dob: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(1)]],

    });

    this.title = this.route.snapshot.data['title'];

     this.authService.getUserDetails().subscribe({
      next: (res) => {
        const data = res.data;
        console.log(data);

        this.profileForm.patchValue({
          firstName: data.first_name,
          lastName: data.last_name,
        });

      },
      error: (error) => {
        console.log("get user component", error);

      }
    })


  }



  get firstName() {
    return this.profileForm.get('firstName');
  }

  get lastName() {
    return this.profileForm.get('lastName');
  }

  get altEmail() {
    return this.profileForm.get('altEmail');
  }

  get altContact() {
    return this.profileForm.get('altContact');
  }

  get dob() {
    return this.profileForm.get('dob');
  }

  get password() {
    return this.profileForm.get('password');
  }

  onSubmit(){


    const data={
      first_name: this.firstName?.value,
      last_name:this.lastName?.value,
      password: this.password?.value,
      date_of_birth: this.dob?.value,
      secondary_mobile_number: this.altContact?.value,
      secondary_email: this.altEmail?.value
    }


    this.authService.updateProfile(data).subscribe(
      {
        next:(res)=>{
          console.log(res);

        },
        error(err) {
          console.log(err);

        },
      }
    )

  }






}



