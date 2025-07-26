import {AbstractControl, FormGroup, ValidationErrors} from '@angular/forms';

export function userNameValidator(control: AbstractControl): ValidationErrors | null {
  const value = control.value;

  if (!value) return null;

  const pattern = /^[A-Za-z]{4}\d{4}$/;

  return pattern.test(value)
    ? null
    : { userName: true };

}


export function confirmFormValidator(control: AbstractControl, form : FormGroup): ValidationErrors | null {

  const value = control.value;

  if (!value.value) {
    return {required: true};
  } else if (value !== form.controls['password'].value) {
    return {confirm: true, error: true};
  }
  return null;

}
