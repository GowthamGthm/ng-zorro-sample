import {Component, OnInit} from '@angular/core';
import {
  AbstractControl,
  FormGroup,
  NonNullableFormBuilder,
  ReactiveFormsModule,
  ValidationErrors,
  Validators
} from '@angular/forms';
import {NzFormModule, NzFormTooltipIcon} from 'ng-zorro-antd/form';
import {NzInputModule} from 'ng-zorro-antd/input';
import {NzButtonModule} from 'ng-zorro-antd/button';
import {AppFormErrorMessageComponent} from '@app/shared/components/app-form-error-message.component';
import {NzCheckboxModule} from 'ng-zorro-antd/checkbox';
import {NzSelectModule} from 'ng-zorro-antd/select';
import {Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';
import {FormValidationUtils} from '@app/shared/form-validation.utils';
import {userNameValidator} from '@app/shared/validators/form.validator';


@Component({
  selector: 'app-reactive-form',
  standalone: true,
  imports: [ReactiveFormsModule, NzButtonModule, NzCheckboxModule, NzFormModule, NzInputModule, NzSelectModule, AppFormErrorMessageComponent],
  templateUrl: './reactive-form.component.html'
})
export class ReactiveFormComponent implements OnInit {

  readonly DEFAULT_VALUE_FOR_FORM: any = {
    userName: '',
    email: '',
    password: '',
    checkPassword: '',
    nickname: '',
    phoneNumberPrefix: '+86',
    phoneNumber: '',
    website: '',
    captcha: '',
    agree: false
  };

  validateForm!: FormGroup;
  captchaTooltipIcon: NzFormTooltipIcon = {
    type: 'info-circle', theme: 'twotone'
  };

  private destroy$ = new Subject<void>();

  constructor(private fb: NonNullableFormBuilder) {
  }

  ngOnInit(): void {

    this.validateForm = this.fb.group({
      userName: this.fb.control('', [Validators.required, userNameValidator]),
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

    // Set the confirm password validator safely AFTER form is created
    this.validateForm.get('checkPassword')?.setValidators([
      Validators.required,
      this.confirmationValidator.bind(this)  // bind to access `this.validateForm`
    ]);
    this.validateForm.get('checkPassword')?.updateValueAndValidity();

    //  Keep password-checkPassword sync
    this.validateForm.get('password')?.valueChanges
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => {
        this.validateForm.get('checkPassword')?.updateValueAndValidity();
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  submitForm(): void {
    console.log("submit --> before validation")

    if (FormValidationUtils.checkIfFormInValid(this.validateForm)) {
      console.log(this.validateForm);
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
    return null;
  }

  getCaptcha(e: MouseEvent): void {
    e.preventDefault();
  }

  resetForm(): void {
    FormValidationUtils.resetFormCompletely(this.validateForm, this.DEFAULT_VALUE_FOR_FORM);
  }

}
