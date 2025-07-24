// form-error.component.ts
import { Component, Input, computed, Signal } from '@angular/core';
import { AbstractControl } from '@angular/forms';

@Component({
  selector: 'app-form-error',
  standalone: true,
  template: `
    <ng-container *ngIf="showError()">
      <div class="error-message">
        {{ firstErrorMessage() }}
      </div>
    </ng-container>
  `,
  styles: [`
    .error-message {
      color: red;
      font-size: 12px;
    }
  `]
})
export class FormErrorComponent {
  @Input({ required: true }) control!: AbstractControl;

  showError() {
    return this.control?.invalid && (this.control.touched || this.control.dirty);
  }

  firstErrorMessage(): string {
    if (!this.control?.errors) return '';

    const errors = this.control.errors;
    if (errors['required']) return 'This field is required';
    if (errors['email']) return 'Invalid email address';
    if (errors['minlength']) return `Minimum ${errors['minlength'].requiredLength} characters required`;
    if (errors['maxlength']) return `Maximum ${errors['maxlength'].requiredLength} characters allowed`;
    if (errors['pattern']) return 'Invalid format';

    // fallback
    return 'Invalid field';
  }
}
