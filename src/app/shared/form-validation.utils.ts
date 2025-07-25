import {AbstractControl, FormArray, FormGroup} from '@angular/forms';

export class FormValidationUtils {


  public static resetFormCompletely(form: FormGroup | FormArray, defaultValues?: any): void {
    console.log('reset form clicked');
    form.reset(defaultValues || {});

    this.recursivelyResetControlStates(form);
  }

  public static checkIfFormInValid(form: FormGroup | FormArray): boolean {

    let invalid = form.invalid;
    if (invalid) {
      this.markAllControlsTouchedAndValidate(form);
    }
    return invalid;
  }

  private static recursivelyResetControlStates(control: AbstractControl): void {
    if (control instanceof FormGroup || control instanceof FormArray) {
      Object.values(control.controls).forEach((child) =>
        this.recursivelyResetControlStates(child));
    }

    control.setErrors(null);
    control.markAsPristine();
    control.markAsUntouched();
    control.updateValueAndValidity({onlySelf: true, emitEvent: false});
  }

  private static markAllControlsTouchedAndValidate(control: AbstractControl): void {
    if (control instanceof FormGroup || control instanceof FormArray) {
      Object.values(control.controls).forEach((child) =>
        this.markAllControlsTouchedAndValidate(child));
    }

    control.markAsTouched({onlySelf: true});
    control.updateValueAndValidity({onlySelf: true});
  }


}
