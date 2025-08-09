import { Component, Input } from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ValidatorMessages, FieldMessages } from '@app/pages/form-validation/error-messages/error-messages.types';

@Component({
  selector: 'app-field-error',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './field-error.component.html',
  styleUrls: ['./field-error.component.css']
})
export class FieldErrorComponent {

  /** Either pass control directly... */
  // @Input() control: AbstractControl | null = null;

  /** ...or pass form + fieldName to let component look it up */
  @Input() form?: FormGroup;
  @Input() fieldName?: string;

  /** Optional per-field override messages */
  // @Input() messages: ValidatorMessages = {};

  /** Optional global messages map */
  @Input() fieldMessages: FieldMessages = {};

  /** Default error messages */
  private defaultMessages: ValidatorMessages = {
    required: () => 'This field is required',
    minlength: (err) => `Minimum ${err.requiredLength} characters`,
    maxlength: (err) => `Maximum ${err.requiredLength} characters`,
    email: () => 'Invalid email format',
    pattern: () => 'Invalid format',
    duplicate: () => 'This Email already exists'
  };

  /** Get control from inputs */
  private getControl(): AbstractControl | null {
    // if (this.control) return this.control;
    if (this.form && this.fieldName) return this.form.get(this.fieldName);
    return null;
  }

  shouldShowErrors(): boolean {
    const ctrl = this.getControl();
    return !!ctrl && ctrl.invalid && (ctrl.dirty || ctrl.touched);
  }

  listErrors(): string[] {
    const ctrl = this.getControl();
    if (!ctrl?.errors) return [];

    const errors = ctrl.errors;

    const mergedMessages: ValidatorMessages = {
      ...this.defaultMessages,
      ...(this.fieldName ? this.fieldMessages[this.fieldName] : {}),
      // ...this.messages
    };

    return Object.keys(errors).map(key => {
      const msgFn = mergedMessages[key];
      return msgFn ? msgFn(errors[key]) : key;
    });
  }
}
