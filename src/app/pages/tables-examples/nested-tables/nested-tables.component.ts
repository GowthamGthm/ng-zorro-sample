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

interface User {
  id: number;
  name: string;
  expand: boolean;
  groups: Group[]
}

interface Group {
  id: number;
  name: string;
}

@Component({
  selector: 'app-nested-tables',
  standalone: true,
  imports: [NzBadgeModule, NzDividerModule, NzDropDownModule, NzIconModule, NzTableModule, CommonModule, NzButtonComponent, FormsModule, NzPopconfirmDirective],
  templateUrl: './nested-tables.component.html',
  styleUrl: './nested-tables.component.css'
})
export class NestedTablesComponent implements OnInit {

  usersList: User[] = [];
  filteredUsersList: User[] = [];
  filterValue: string = '';

  ngOnInit(): void {
    this.usersList = [
      {
        id: 1,
        name: "Alice Johnson",
        expand: false,
        groups: [
          {id: 101, name: "Admin"},
          {id: 102, name: "Finance"}
        ]
      },
      {
        id: 2,
        name: "Bob Smith",
        expand: false,
        groups: [
          {id: 103, name: "Developers"},
          {id: 104, name: "QA"}
        ]
      },
      {
        id: 3,
        name: "Charlie Williams",
        expand: false,
        groups: [
          {id: 105, name: "HR"}
        ]
      },
      {
        id: 4,
        name: "Diana Roberts",
        expand: false,
        groups: []
      }
    ];

    this.filteredUsersList = JSON.parse(JSON.stringify(this.usersList));

  }


  deleteCLicked(userId: number, groupId: number) {
    console.log("clicked for delete: userID: " + userId + ",  GroupID:  " +groupId);
  }

  filterByName(filterValue: string) {

    if (!filterValue) {
      this.filteredUsersList = JSON.parse(JSON.stringify(this.usersList));
      return;
    }

    this.filteredUsersList = this.usersList.filter(ele => ele.name.toLowerCase().includes(filterValue.toLowerCase()));

  }


}
