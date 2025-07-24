import { Component, Input, computed, signal } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import {NgIf} from '@angular/common';

@Component({
  selector: 'app-form-error',
  standalone: true,
  template: `
    <div class="error-message" *ngIf="shouldShowError()">
      {{ getErrorMessage() }}
    </div>
  `,
  imports: [
    NgIf
  ],
  styles: [`
    .error-message {
      color: red;
      font-size: 12px;
      margin-top: 4px;
    }
  `]
})
export class FormErrorComponent {
  @Input({ required: true }) control!: AbstractControl;
  // @Input() submitted: boolean = false; // pass this from the parent form

  shouldShowError(): boolean {
    return !!this.control &&
      this.control.invalid &&
      (this.control.touched);
  }

  getErrorMessage(): string {

    const errors = this.control.errors;

    console.log(errors);

    if (!errors) return '';

    if (errors['required']) return 'This field is required';
    if (errors['email']) return 'Enter a valid email';
    if (errors['minlength']) return `Minimum ${errors['minlength'].requiredLength} characters`;
    if (errors['maxlength']) return `Maximum ${errors['maxlength'].requiredLength} characters`;
    if (errors['pattern']) return 'Invalid format';
    if(errors['passwordPattern']) return 'Password Pattern should be 4 alphabets and 4 numbers EX: AAAA1111';

    return 'Invalid input';

  }
}
