import {Component, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {NzBadgeModule} from 'ng-zorro-antd/badge';
import {NzDividerModule} from 'ng-zorro-antd/divider';
import {NzDropDownModule} from 'ng-zorro-antd/dropdown';
import {NzTableModule} from 'ng-zorro-antd/table';
import {NzIconModule} from 'ng-zorro-antd/icon';
import {NzButtonComponent} from 'ng-zorro-antd/button';
import {FormsModule} from '@angular/forms';
import {NzPopconfirmDirective} from 'ng-zorro-antd/popconfirm';

interface ParentItemData {
  key: number;
  name: string;
  platform: string;
  version: string;
  upgradeNum: number | string;
  creator: string;
  createdAt: string;
  expand: boolean;
  childrenItemData: ChildrenItemData[]
}

interface ChildrenItemData {
  key: number;
  name: string;
  date: string;
  upgradeNum: string;
}

@Component({
  selector: 'app-nested-tables',
  standalone: true,
  imports: [NzBadgeModule, NzDividerModule, NzDropDownModule, NzIconModule, NzTableModule, CommonModule, NzButtonComponent, FormsModule, NzPopconfirmDirective],
  templateUrl: './nested-tables.component.html',
  styleUrl: './nested-tables.component.css'
})
export class NestedTablesComponent implements OnInit {

  listOfParentData: ParentItemData[] = [];
  filteredListOFParentData: ParentItemData[] = [];
  filterValue: string = '';

  ngOnInit(): void {


    for (let i = 0; i < 3; ++i) {

      let childrenItemData: ChildrenItemData[] = [];

      for (let j = 0; j < 3; ++j) {
        childrenItemData.push({
          key: j + 1,
          date: '2014-12-24 23:12:00',
          name: 'This is production name',
          upgradeNum: 'Upgraded: 56'
        });
      }

      this.listOfParentData.push({
        key: i + 1,
        name: 'Screen' + (i + 1),
        platform: 'iOS',
        version: '10.3.4.5654',
        upgradeNum: 500,
        creator: 'Jack',
        createdAt: '2014-12-24 23:12:00',
        expand: false,
        childrenItemData: childrenItemData
      });
    }

    this.filteredListOFParentData = JSON.parse(JSON.stringify(this.listOfParentData));


  }


  deleteCLicked(key: number, key2: number) {
    console.log("clicked for delete: userID: " + key + ",  GroupID:  " + key2);
  }

  filterByName(filterValue: string) {

    if (!filterValue) {
      this.filteredListOFParentData = JSON.parse(JSON.stringify(this.listOfParentData));
      return;
    }


    this.filteredListOFParentData = this.listOfParentData.filter(ele => ele.name.toLowerCase().includes(filterValue.toLowerCase()));


  }


}
