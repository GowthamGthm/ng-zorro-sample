import { Routes } from '@angular/router';
import {VALIDATION_ROUTES} from '@app/pages/form-validation/validation.routes';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/welcome' },
  { path: 'welcome', loadChildren: () => import('./pages/welcome/welcome.routes').then(m => m.WELCOME_ROUTES) },
  { path: 'validation', loadChildren: () => import('./pages/form-validation/validation.routes').then(m => m.VALIDATION_ROUTES) }
];
