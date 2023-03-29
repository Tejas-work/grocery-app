import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function matchPassword(passwordControlName: string, rePasswordControlName: string): ValidatorFn {
  return (controls: AbstractControl): ValidationErrors | null => {
    const password = controls.get(passwordControlName);
    const rePassword = controls.get(rePasswordControlName);


    if(password?.pristine || rePassword?.pristine){
      return null;
  }

    if (password?.value !== rePassword?.value) {
      controls.get(rePasswordControlName)?.setErrors({ mismatch: true, message: "Passwords do not match" });
      return { mismatch: true };
    } else {
      controls.get(rePasswordControlName)?.setErrors(null);
      return null;
    }
  }
}
