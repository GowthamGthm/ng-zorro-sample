# NgZorroSample

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 18.2.20.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page


## To Stop console logs through out the application

`if (true) {`
`console.log = () => {};`
`console.debug = () => {};`
`console.info = () => {};`
`console.warn = () => {};`
`}`

##ng-zorro validation for nzErrorTip online

`<nz-form-item>`
    `<nz-form-label [nzSm]="6" [nzXs]="24" nzRequired nzFor="email">E-mail</nz-form-label>`
    `<nz-form-control [nzSm]="14" [nzXs]="24" [nzErrorTip]="this.validateForm.get('email')?.errors?.['required'] ? 'Email is required!' :`
    `this.validateForm.get('email')?.errors?.['email'] ? 'The input is not valid E-mail!' :`
    `this.validateForm.get('email')?.errors?.['duplicate'] ? 'This email already exists!' :`
    `''">`
      `<input nz-input formControlName="email" id="email" />`
    `</nz-form-control>`
  `</nz-form-item>`



ng-zorro - nz-table use below for the server side pagination
<!-- NOTE:  nzFrontPagination = false to use server side pagination -->
