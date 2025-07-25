import {Component, Input, OnInit} from '@angular/core';
import {AbstractControl} from '@angular/forms';
import {CommonModule} from '@angular/common';

@Component({
  selector: 'app-form-error-validation',
  standalone: true,
  imports: [CommonModule],
  template: `
    <ng-container *ngIf="control?.errors">
      <span *ngFor="let key of errorKeys">
        <ng-container *ngIf="control?.errors?.[key]">
          {{ errorMap[key] }}
        </ng-container>
      </span>
    </ng-container>
  `
})
export class AppFormErrorValidationComponent implements OnInit {


  @Input() control!: AbstractControl | null;

  errorMap: { [key: string]: string } = {
    required: 'This field is required!',
    email: 'Please input a valid email!'
  };

  get errorKeys() {
    return Object.keys(this.errorMap);
  };

  ngOnInit(): void {

  }


}
