import {Component, Input, OnInit} from '@angular/core';
import {AbstractControl} from '@angular/forms';
import {CommonModule} from '@angular/common';

@Component({
  selector: 'app-form-error-msg',
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
export class AppFormErrorMessageComponent implements OnInit {


  @Input() control!: AbstractControl | null;

  errorMap: { [key: string]: string } = {
    required: 'This field is required!',
    email: 'Please input a valid email!',
    userName: 'UserName should start with 4  characters and 4 numbers , max 8 characters  Ex: ABCD1234'
  };

  get errorKeys() {
    return Object.keys(this.errorMap);
  };

  ngOnInit(): void {

  }


}
