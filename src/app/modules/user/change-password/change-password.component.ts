import { Component, EventEmitter, Output } from '@angular/core';
import {FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { AuthService } from 'src/app/shared/services/auth.service';
import { matchPassword } from 'src/app/shared/validators /matchPassword.validator';
import { patternPassword } from 'src/app/shared/validators /patternPassword.validator';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent {
  changePassword!: FormGroup;

  message: string = '';
  @Output() pageTitleChanged = new EventEmitter<string>();
  pageTitle = 'Change Password';




  constructor(private fb: FormBuilder, private authService: AuthService) {

  }


  ngOnInit() {
    this.pageTitleChanged.emit(this.pageTitle);
    this.changePassword = this.fb.group(
      {
        currentPassword: ['', Validators.required],
        newPassword: ['', [Validators.required, Validators.minLength(8)]],
        confirmNewPassword: ['', [Validators.required]]
      },
      {
        validators: [patternPassword('newPassword'),matchPassword('newPassword', 'confirmNewPassword')],

      }
    )
  }

  get currentPassword() {
    return this.changePassword.get('currentPassword')
  }
  get newPassword() {
    return this.changePassword.get('newPassword')
  }
  get confirmNewPassword() {
    return this.changePassword.get('confirmNewPassword')
  }


  onSubmit() {
    let data =
    {
      oldPassword: this.currentPassword?.value,
      newPassword: this.newPassword?.value
    }
    console.log(data);


    this.authService.changePassword(data).subscribe({
      next: (res) => {
        console.log(res);
        this.message = "Password change successfully"
        this.changePassword.reset();


      }, error: (error) => {
        console.log(error);
        this.message=error.error.message;
      }
    })
  }



}
