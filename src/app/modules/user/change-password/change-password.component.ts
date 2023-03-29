import { Component } from '@angular/core';
import { AbstractControl, Form, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { matchPassword } from 'src/app/shared/validators /matchPassword.validator';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent {
changePassword!: FormGroup;




constructor(private fb:FormBuilder){

}


ngOnInit(){
  this.changePassword=this.fb.group(
    {
      currentPassword:['',Validators.required],
      newPassword:['', [Validators.required, Validators.minLength(8)]],
      confirmNewPassword:['',[Validators.required]]
    },
    {
      validators:matchPassword('newPassword','confirmNewPassword')
    }
  )
}

get currentPassword(){
  return this.changePassword.get('currentPassword')
}
get newPassword(){
  return this.changePassword.get('newPassword')
}
get confirmNewPassword(){
  return this.changePassword.get('confirmNewPassword')
}




}
