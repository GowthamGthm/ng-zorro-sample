import { AbstractControl, ValidationErrors } from '@angular/forms';

export function passwordPatternValidator(control: AbstractControl): ValidationErrors | null {
  const value = control.value;

  if (!value) return null;

  const pattern = /^[A-Za-z]{4}\d{4}$/;

  return pattern.test(value)
    ? null
    : { passwordPattern: true };

}
