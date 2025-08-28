import { Component } from '@angular/core';
import {AbstractControl, FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { CommonModule } from '@angular/common';
import {NzUploadFile, NzUploadModule} from 'ng-zorro-antd/upload';
import {NzIconModule} from 'ng-zorro-antd/icon';
import {NzDividerComponent} from 'ng-zorro-antd/divider';

@Component({
  selector: 'app-upload-modal',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    NzModalModule,
    NzButtonModule,
    NzFormModule,
    NzInputModule,
    NzUploadModule,
    NzIconModule,
    NzDividerComponent
  ],
  templateUrl: './my-modal.component.html',
  styleUrl: './my-modal.component.css'
})
export class MyModalComponent {
  isVisible = false;

  allowedTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    'application/vnd.ms-excel', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    'text/plain', 'application/vnd.ms-outlook'];

  uploadForm: FormGroup;
  maxFileSizeMB = 5;

  constructor(private fb: FormBuilder) {
    this.uploadForm = this.fb.group({
      documents: this.fb.array([this.createDocument()])
    });
  }

  getValidateStatus(control: AbstractControl): 'error' | 'success' | 'warning' | '' {
    if (!control) return '';
    if (control.invalid && (control.dirty || control.touched)) return 'error';
    if (control.valid && (control.dirty || control.touched)) return 'success';
    return '';
  }

  get documents(): FormArray {
    // return this.uploadForm.get('documents') as FormArray;
    // return this.uploadForm.get('documents') as FormArray<FormGroup>;
    return this.uploadForm.get('documents')! as FormArray;
  }

  getFileControl(index: number): AbstractControl {
    return this.documents.at(index).get('fileName')!;
  }

  createDocument(): FormGroup {
    return this.fb.group({
      fileName: ['', Validators.required],   // validation: required
      file: [null, Validators.required],
      fileList : [[]]
    });
  }

  addDocument(): void {
    this.documents.push(this.createDocument());
  }

  removeDocument(index: number): void {
    this.documents.removeAt(index);
  }

  beforeUploadWrapper(index: number) {
    return (file: NzUploadFile) => this.beforeUpload(file, index);
  }

  beforeUpload(file: NzUploadFile, index: number): boolean {
    // Validate type
    if (!this.allowedTypes.includes(file.type || "")) {
      alert('Invalid file type!');
      return false;
    }

    // Validate size
    const sizeMB = (file.size || 1) / (1024 * 1024);
    if (sizeMB > this.maxFileSizeMB) {
      alert(`File size exceeds ${this.maxFileSizeMB} MB`);
      return false;
    }

    // Update form
    const doc = this.documents.at(index);
    doc.patchValue({
      fileName: file.name,
      file: file,
      fileList: [file]
    });

    return false; // prevent default behavior
  }


  submitForm(): void {
    console.log(this.uploadForm.value);
    // here you’ll get: [{ fileName: 'abc.pdf', file: File }, ...]

    console.log(this.uploadForm.invalid);

    if (this.uploadForm.invalid) {
      // mark all controls as touched to show errors
      this.documents.controls.forEach(doc => {
        doc.markAllAsTouched();
        doc.markAsTouched();
      });
      return;
    }
  }

}
