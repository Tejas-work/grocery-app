import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function patternPassword(passwordControlName: string): ValidatorFn {
  return (controls: AbstractControl): ValidationErrors | null => {
    const password = controls.get(passwordControlName);

    if (password?.pristine) {
      return null;
    }

    const digitRegex = /\d/;
    const capitalRegex = /[A-Z]/;
    const signRegex = /[\W_]/;

    if (!digitRegex.test(password?.value)) {
      controls
        .get(passwordControlName)
        ?.setErrors({
          match: true,
          message: 'Password includes at least one digit',
        });
      return { mismatch: true };
    } else if (!capitalRegex.test(password?.value)) {
      controls
        .get(passwordControlName)
        ?.setErrors({
          match: true,
          message: 'Password includes at least one capital letter',
        });
        return { match: true };
    } else if (!signRegex.test(password?.value)) {
      controls
        .get(passwordControlName)
        ?.setErrors({
          match: true,
          message: 'Password includes at least one special character',
        });
        return { match: true };
    } else {
      controls.get(passwordControlName)?.setErrors(null);
      return null;
    }
  };
}
