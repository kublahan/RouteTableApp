import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatSort, MatSortModule, Sort } from '@angular/material/sort';
import { Route } from '../models/route.model';
import { ROUTES } from '../data/route-data';
import { CommonModule } from '@angular/common';


function compareIpAddresses(ip1: string, ip2: string): number {
  const parts1 = ip1.split('.').map(Number);
  const parts2 = ip2.split('.').map(Number);

  for (let i = 0; i < 4; i++) {
    if (parts1[i] < parts2[i]) {
      return -1;
    }
    if (parts1[i] > parts2[i]) {
      return 1;
    }
  }
  return 0;
}

@Component({
  selector: 'app-route-table',

  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatSortModule 
  ],
  templateUrl: './route-table.component.html',
  styleUrls: ['./route-table.component.scss']
})
export class RouteTableComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['address', 'gateway', 'interface'];
  dataSource: MatTableDataSource<Route>;

  @ViewChild(MatSort) sort!: MatSort;

  constructor() {
    this.dataSource = new MatTableDataSource(ROUTES);
  }

  ngOnInit(): void {
    this.dataSource.sortingDataAccessor = (item: Route, property: string) => {
      switch (property) {
        case 'address':
        case 'gateway':
          return item[property];
        case 'interface':
          return item.interface.toLowerCase();
        default:
          return (item as any)[property];
      }
    };
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;


    this.sort.sortChange.subscribe((sort: Sort) => {
      if (!sort.active || sort.direction === '') {
        this.dataSource.data = [...ROUTES];
        return;
      }

      this.dataSource.data = this.sortData([...this.dataSource.data], sort);
    });
  }

  private sortData(data: Route[], sort: Sort): Route[] {
    const isAsc = sort.direction === 'asc';
    return data.sort((a, b) => {
      switch (sort.active) {
        case 'address':
          return compareIpAddresses(a.address, b.address) * (isAsc ? 1 : -1);
        case 'gateway':
          return compareIpAddresses(a.gateway, b.gateway) * (isAsc ? 1 : -1);
        case 'interface':
          return this.compareStrings(a.interface, b.interface, isAsc);
        default:
          return 0;
      }
    });
  }

  private compareStrings(a: string, b: string, isAsc: boolean): number {
    return (a.toLowerCase() < b.toLowerCase() ? -1 : 1) * (isAsc ? 1 : -1);
  }
}