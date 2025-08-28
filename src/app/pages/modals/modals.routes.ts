import {Routes} from '@angular/router';
import {NestedTablesComponent} from '@app/pages/tables-examples/nested-tables/nested-tables.component';
import {
  VerticalScrollingTableComponent
} from '@app/pages/tables-examples/vertical-scrolling-table/vertical-scrolling-table.component';
import {MyModalComponent} from '@app/pages/modals/modals-component/my-modal.component';

export const MODALS_ROUTES: Routes = [

  { path: 'dynamic', component: MyModalComponent }

];
