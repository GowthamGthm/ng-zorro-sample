import {Component, OnDestroy, OnInit} from '@angular/core';
import {
  AbstractControl, FormGroup, NonNullableFormBuilder, ReactiveFormsModule, ValidationErrors, Validators
} from '@angular/forms';
import {Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';

import {NzButtonModule} from 'ng-zorro-antd/button';
import {NzCheckboxModule} from 'ng-zorro-antd/checkbox';
import {NzFormModule, NzFormTooltipIcon} from 'ng-zorro-antd/form';
import {NzInputModule} from 'ng-zorro-antd/input';
import {NzSelectModule} from 'ng-zorro-antd/select';
import {AppFormErrorValidationComponent} from '@app/pages/table2/app-form-error-validation.component';

@Component({
  selector: 'app-table2',
  standalone: true,
  imports: [ReactiveFormsModule, NzButtonModule, NzCheckboxModule, NzFormModule, NzInputModule, NzSelectModule, AppFormErrorValidationComponent],
  templateUrl: './table2.component.html',
  styleUrl: './table2.component.css'
})
export class Table2Component implements OnInit, OnDestroy {

  validateForm!: FormGroup;
  captchaTooltipIcon: NzFormTooltipIcon = {
    type: 'info-circle', theme: 'twotone'
  };
  private destroy$ = new Subject<void>();

  constructor(private fb: NonNullableFormBuilder) {
  }

  ngOnInit(): void {

    this.validateForm = this.fb.group({
      email: this.fb.control('', [Validators.email, Validators.required]),
      password: this.fb.control('', [Validators.required]),
      checkPassword: this.fb.control('', [Validators.required, this.confirmationValidator]),
      nickname: this.fb.control('', [Validators.required]),
      phoneNumberPrefix: this.fb.control<'+86' | '+87'>('+86'),
      phoneNumber: this.fb.control('', [Validators.required]),
      website: this.fb.control('', [Validators.required]),
      captcha: this.fb.control('', [Validators.required]),
      agree: this.fb.control(false)
    });


    this.validateForm.controls['password'].valueChanges.pipe(takeUntil(this.destroy$)).subscribe(() => {
      this.validateForm.controls['checkPassword'].updateValueAndValidity();
    });

  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  submitForm(): void {
    console.log("submit --> before validation")

    if (this.validateForm.invalid) {
      Object.values(this.validateForm.controls).forEach(control => {
        control.markAsTouched();
        control.updateValueAndValidity();
      });
      return;
    }

    console.log('submit', this.validateForm);
  }

  confirmationValidator(control: AbstractControl): ValidationErrors | null {
    if (!control.value) {
      return {required: true};
    } else if (control.value !== this.validateForm.controls['password'].value) {
      return {confirm: true, error: true};
    }
    return {};
  }

  getCaptcha(e: MouseEvent): void {
    e.preventDefault();
  }

  resetForm(): void {
    this.validateForm.reset();
    Object.keys(this.validateForm.controls).forEach(key => {
      this.validateForm.controls[key].setErrors(null);
      this.validateForm.controls[key].markAsPristine();
      this.validateForm.controls[key].markAsUntouched();
    });
  }

}
