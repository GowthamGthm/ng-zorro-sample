import { Component, OnInit} from '@angular/core';
import {NzButtonModule} from 'ng-zorro-antd/button';
import {NzTableModule} from 'ng-zorro-antd/table';
import {FormsModule} from '@angular/forms';

export interface Data {
  id: number;
  name: string;
  age: number;
  address: string;
  disabled: boolean;
}

type DataKey = keyof Data;

interface ColumnDefinition {
  header: string;
  variable: DataKey;
}

@Component({
  selector: 'app-vertical-scrolling-table',
  standalone: true,
  imports: [NzButtonModule, NzTableModule, FormsModule],
  templateUrl: './vertical-scrolling-table.component.html',
  styleUrl: './vertical-scrolling-table.component.css'
})
export class VerticalScrollingTableComponent implements OnInit {
  listOfData: Data[] = [];
  filteredListOfData: Data[] = [];

  sortFunctions: Record<DataKey, (a: Data, b: Data) => number> = {} as any;

  filterValue : string = "";

  colDefinitions : ColumnDefinition[] = [
    {
      header: "Name",
      variable: "name"
    },
    {
      header: "Age",
      variable: "age"
    },
    {
      header: "Address",
      variable: "address"
    }
  ];



  ngOnInit(): void {
    this.listOfData = new Array(1000).fill(0)
      .map((_, index) => ({
      id: index + 1,
      name: `Edward King ${index + 1}`,
      age: (32 + index),
      address: `London, Park Lane no. ${index + 1}`,
      disabled: index % 2 === 0
    }));

    (['name', 'age', 'address'] as DataKey[]).forEach(key => {
      this.sortFunctions[key] = this.createSortFn(key);
    });

  }

  createSortFn(columnKey: DataKey) {
    return (a: Data, b: Data): number => {
      const valA = a[columnKey];
      const valB = b[columnKey];

      // Null / undefined handling
      if (valA == null && valB == null) return 0;
      if (valA == null) return -1;
      if (valB == null) return 1;

      // Handle booleans
      if (typeof valA === 'boolean' && typeof valB === 'boolean') {
        return Number(valA) - Number(valB); // false < true
      }

      // Convert to strings
      const strA = String(valA).trim();
      const strB = String(valB).trim();

      // Try number comparison if both numeric
      const numA = Number(strA);
      const numB = Number(strB);
      const isNumA = !isNaN(numA) && strA !== '';
      const isNumB = !isNaN(numB) && strB !== '';

      if (isNumA && isNumB) {
        return numA - numB;
      }

      // Numbers before non-numbers
      if (isNumA && !isNumB) return -1;
      if (!isNumA && isNumB) return 1;

      // Alphanumeric / string comparison (case-insensitive, numeric-aware)
      return strA.localeCompare(strB, undefined, { numeric: true, sensitivity: 'base' });
    };
  }


  exportToCSV() {
    const header: string = this.colDefinitions.map(col => `"${col.header}"`).join(',');

    const rows = this.listOfData.map(row =>
      this.colDefinitions.map(col => {
        let cell = row[col.variable];
        if (cell == null || cell == undefined) cell = '';
        return `"${String(cell).replace(/"/g, '""')}"`;
      }).join(',')
    );

    const csvContent = [header, ...rows].join('\r\n');
    const today = new Date();
    const dateString = today.toISOString().split('T')[0];
    const filename = `table-data-${dateString}.csv`;

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });

    // Programmatically trigger download without anchor link in DOM
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.style.display = 'none';
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }

  filterByUserName(searchStr : string) {

  }



}
