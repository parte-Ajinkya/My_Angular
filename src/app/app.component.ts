import { Component, OnInit } from '@angular/core';
import { Column, Formatters, GridOption } from 'angular-slickgrid';
import { AngularGridInstance, FieldType ,AutoResizeOption } from 'angular-slickgrid';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Branch-Names';
  columnDefinitions1!: Column[];
  gridOptions1!: GridOption;
  dataset1!: any[];
  columnDefinitions2!: Column[];
  gridOptions2!: GridOption;
  dataset2!: any[];

  ngOnInit(): void {
    this.columnDefinitions1 = [
      { id: 'branchName', name: 'Branch Name', field: 'branchName', sortable: true },
      { id: 'branchCode', name: 'Branch Code', field: 'branchCode', sortable: true },
      { id: 'address', name: 'Address', field: 'address', sortable: true },
      { id: 'pincode', name: 'Pincode', field: 'pincode', sortable: true },
      { id: 'country', name: 'Country', field: 'country', sortable: true }
    ];

    this.columnDefinitions2 = [
      { id: 'branchManager', name: 'Branch Manager', field: 'branchManager', sortable: true },
      { id: 'designation', name: 'Designation', field: 'designation', sortable: true },
      { id: 'contactnumber', name: 'Contact Number', field: 'contactnumber', sortable: true },
      { id: 'country', name: 'Country', field: 'country', sortable: true }
    ];

    this.gridOptions1 = {
      enableAutoResize: true,
      autoResize: { container: 'grid-container' },
      // gridHeight:1000,
      // gridWidth:1000
      
    };

    this.gridOptions2 = {
      enableAutoResize: true,
      autoResize: { container: 'grid-container' },
      // gridHeight:1000,
      // gridWidth:1000
      
    };

    this.dataset1 = [
      { branchName: 'Branch 1', branchCode: '001', address: 'Address 1', pincode: '12345', country: 'Country 1' ,id:1},
      { branchName: 'Branch 2', branchCode: '002', address: 'Address 2', pincode: '67890', country: 'Country 2',id:2 },
      { branchName: 'Branch 3', branchCode: '003', address: 'Address 3', pincode: '67567', country: 'Country 3',id:3 },
      { branchName: 'Branch 4', branchCode: '004', address: 'Address 4', pincode: '67877', country: 'Country 4',id:4 },
      { branchName: 'Branch 5', branchCode: '005', address: 'Address 5', pincode: '67857', country: 'Country 5',id:5 },
    ];


    this.dataset2 = [
      { branchManager: 'Name 1', branchCode: '001', address: 'Address 1', pincode: '12345', country: 'Country 1' ,id:1},
      { branchName: 'Branch 2', branchCode: '002', address: 'Address 2', pincode: '67890', country: 'Country 2',id:2 },
      { branchName: 'Branch 3', branchCode: '003', address: 'Address 3', pincode: '67567', country: 'Country 3',id:3 },
      { branchName: 'Branch 4', branchCode: '004', address: 'Address 4', pincode: '67877', country: 'Country 4',id:4 },
      { branchName: 'Branch 5', branchCode: '005', address: 'Address 5', pincode: '67857', country: 'Country 5',id:5 },
    ];
  }

  

}

