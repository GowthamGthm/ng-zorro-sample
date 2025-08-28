import {Routes} from '@angular/router';

export const routes: Routes = [
  {path: '', pathMatch: 'full', redirectTo: '/welcome'},
  {path: 'welcome', loadChildren: () => import('./pages/welcome/welcome.routes').then(m => m.WELCOME_ROUTES)},
  {
    path: 'validation',
    loadChildren: () => import('./pages/form-validation/validation.routes').then(m => m.VALIDATION_ROUTES)
  },
  {path: 'tables', loadChildren: () => import('./pages/tables-examples/tables.routes').then(m => m.TABLES_ROUTES)},
  {path: 'modals', loadChildren: () => import('./pages/modals/modals.routes').then(m => m.MODALS_ROUTES)}

];
