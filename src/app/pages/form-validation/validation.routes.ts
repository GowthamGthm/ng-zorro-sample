import { Routes } from '@angular/router';
import {ReactiveWithoutTemplateComponent} from '@app/pages/form-validation/reactive-without-template/reactive-without-template.component';
import {
  ReactiveWithTemplateComponent
} from '@app/pages/form-validation/reactive-with-template/reactive-with-template.component';

export const VALIDATION_ROUTES: Routes = [

  { path: 'reactive-without-template', component: ReactiveWithoutTemplateComponent },
  { path: 'reactive-with-template', component: ReactiveWithTemplateComponent },

];
