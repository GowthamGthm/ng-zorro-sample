import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';
import {
  NzFormControlComponent,
  NzFormItemComponent,
  NzFormLabelComponent
} from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzButtonModule } from 'ng-zorro-antd/button';
import {FormErrorComponent} from '@app/shared/components/app-form-error.component';
import {passwordPatternValidator} from '@app/shared/validators/password-character.validator';


@Component({
  selector: 'app-reactive-form',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    NzFormItemComponent,
    NzFormLabelComponent,
    NzFormControlComponent,
    NzInputModule,
    NzButtonModule,
    FormErrorComponent
  ],
  templateUrl: './reactive-form.component.html'
})
export class ReactiveFormComponent implements OnInit {

  // submitted = false;

  validateForm!: FormGroup<{
    username: FormControl<string | null>;
    email: FormControl<string | null>;
    password: FormControl<string | null>;
  }>;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.maxLength(8) , passwordPatternValidator ]]
    });
  }

  submitForm(): void {
    // this.submitted= true;

    // if (this.validateForm.invalid) {
    //   Object.values(this.validateForm.controls).forEach(control => {
    //     control.markAsDirty();
    //     control.updateValueAndValidity();
    //   });
    //   return;
    // }

    if (this.validateForm.invalid) {
      this.validateForm.markAllAsTouched();
      return;
    }

    console.log('Form Submitted:', this.validateForm.value);
  }

}
