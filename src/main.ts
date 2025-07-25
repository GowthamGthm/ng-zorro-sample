import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';

import { AllCommunityModule, ModuleRegistry } from 'ag-grid-community';

ModuleRegistry.registerModules([AllCommunityModule]);


// TO DISABLE LOGS THROUGH OUT THE APPLICATION
// if (false) {
//   console.log = () => {};
//   console.debug = () => {};
//   console.info = () => {};
//   console.warn = () => {};
// }

bootstrapApplication(AppComponent, appConfig).catch((err) =>
  console.error(err)
);
