import {Routes} from '@angular/router';
import {NestedTablesComponent} from '@app/pages/tables-examples/nested-tables/nested-tables.component';
import {
  VerticalScrollingTableComponent
} from '@app/pages/tables-examples/vertical-scrolling-table/vertical-scrolling-table.component';

export const TABLES_ROUTES: Routes = [

  { path: 'nested', component: NestedTablesComponent },
  { path: 'v-scroll', component: VerticalScrollingTableComponent },

];
