import {Component} from '@angular/core';
import {Subject} from 'rxjs';
import {
  AbstractControl,
  FormGroup,
  NonNullableFormBuilder,
  ReactiveFormsModule,
  ValidationErrors,
  Validators
} from '@angular/forms';
import {NzFormModule, NzFormTooltipIcon} from 'ng-zorro-antd/form';
import {takeUntil} from 'rxjs/operators';
import {NzButtonModule} from 'ng-zorro-antd/button';
import {NzCheckboxModule} from 'ng-zorro-antd/checkbox';
import {NzInputModule} from 'ng-zorro-antd/input';
import {NzSelectModule} from 'ng-zorro-antd/select';
import {FieldErrorComponent} from '@app/pages/form-validation/field-error/field-error.component';
import {FieldMessages} from '@app/pages/form-validation/error-messages/error-messages.types';

@Component({
  selector: 'app-reactive-with-template',
  standalone: true,
  imports: [ReactiveFormsModule, NzButtonModule, NzCheckboxModule, NzFormModule, NzInputModule, NzSelectModule, FieldErrorComponent],
  templateUrl: './reactive-with-template.component.html',
  styleUrl: './reactive-with-template.component.css'
})
export class ReactiveWithTemplateComponent {

  private destroy$ = new Subject<void>();

  validateForm!: FormGroup;

  fieldErrorMessages : FieldMessages = {
    email: {
      required: ()=> 'Email is required !!!!',
      email: () => 'Not a valid email !!!!!',
      maxlength: (err) => `Password must be max ${err.requiredLength} characters`,
    },
    password: {
      // required: () => 'Password is required $$$$$'
    },
    checkPassword: {
      confirm: () => 'Passwords do not match'
    }
  };

  captchaTooltipIcon: NzFormTooltipIcon = {
    type: 'info-circle',
    theme: 'twotone'
  };

  constructor(private fb: NonNullableFormBuilder) {
  }

  ngOnInit(): void {

    this.validateForm = this.fb.group({
      email: this.fb.control('', [Validators.email, Validators.required , Validators.maxLength(10)]),
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
    if (this.validateForm.invalid) {
      Object.values(this.validateForm.controls).forEach(control => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({onlySelf: true});
        }
      });
    } else {
      console.log('submit', this.validateForm.value);
    }
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


}
