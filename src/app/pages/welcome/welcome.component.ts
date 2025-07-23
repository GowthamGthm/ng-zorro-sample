import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { NzTabsModule } from 'ng-zorro-antd/tabs';
import { NzCollapseModule } from 'ng-zorro-antd/collapse';
import { Table1Component } from "../table1/table1.component";
import { Table2Component } from "../table2/table2.component";


@Component({
  selector: 'app-welcome',
  standalone: true,
  imports: [NzTabsModule, NzCollapseModule, Table1Component, Table2Component],

  // encapsulation: ViewEncapsulation.None,
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements OnInit {

  activePanelIndex : number = 1;

  constructor() { }

  ngOnInit() { }

onPanelChange(active: boolean, index: number): void {
  if (active) {
    this.activePanelIndex = index;
  }
}



}
