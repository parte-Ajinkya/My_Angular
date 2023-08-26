import { Component, OnInit, ElementRef, ViewChild, ChangeDetectorRef } from '@angular/core';
import { EventEmitter, Output } from '@angular/core';
import { AngularSlickgridComponent, Formatters, SlickDataView } from 'angular-slickgrid';
import { AngularGridInstance, Column, FieldType, GridOption } from 'angular-slickgrid';
import { event } from 'jquery';
import { RowSelectionModelOption, CheckboxSelectorOption } from 'angular-slickgrid';
import { FormBuilder, FormGroup, Validators, FormArray, FormControl, ValidatorFn, AbstractControl, ValidationErrors } from '@angular/forms';
@Component({
  selector: 'app-vendors',
  templateUrl: './vendors.component.html',
  styleUrls: ['./vendors.component.css']
})
export class VendorsComponent implements OnInit {

 
  @ViewChild('fileInput') fileInput!: ElementRef;
  @ViewChild('angularSlickgrid') angularSlickgrid!: AngularSlickgridComponent; // Add this line
  form!: FormGroup;
  minDate = new Date();
  selectedFileName: string = '';

  // @ViewChild('angularSlickgrid') angularSlickgrid: any;

  
  // @ViewChild('angularSlickgrid') angularSlickgrid!: AngularSlickgridComponent;
  data: any[] = []; // Array to hold data for the Angular Slickgrid
  angularGrid!: AngularGridInstance;
  columnDefinitions: Column[] = [];
  gridOptions !: GridOption;
  dataView!: SlickDataView; // Add this line
  selectedIds: number[] = [1]; // IDs that should be checked and disabled
  greenCheckboxClass = 'green-checkbox';
  normalCheckboxClass = 'normal-checkbox';
  sampleData = [
    { vendorName: 'Vendor 1', dateOfReport: '2023-08-10', remark: 'Remark 1', lipReport: 'lip-report-1.pdf', id: 1 },
    { vendorName: 'Vendor 2', dateOfReport: '2023-08-11', remark: 'Remark 2', lipReport: 'lip-report-2.pdf', id: 2 },
    { vendorName: 'Vendor 3', dateOfReport: '2023-08-12', remark: 'Remark 3', lipReport: 'lip-report-3.pdf', id: 3 }
  ];

  dropdownData = [
    { id: 1, name: 'Option 1' },
    { id: 2, name: 'Option 2' },
    { id: 3, name: 'Option 3' }
  ];
  gridInstance!: AngularGridInstance;
  dataDuplicate: any[] = [];
  constructor(private fb: FormBuilder, private cdr: ChangeDetectorRef) {
    

    
   


  }

  ngOnInit(): void {

    this.form = this.fb.group({

      vendorName: [null, Validators.required],
      dateOfReport: [null],
      remark: [null, [Validators.pattern('^[a-zA-Z]*$')]],
      lipReport: [null]
    });

    this.gridOptions = {
      enableAutoResize: true,
      enableCellNavigation: true,
      enableColumnReorder: false,
      editable: true,
      autoEdit: true,
      enableRowSelection: true,
     
    };


    this.createColumnDefinitions();




    // this.data=this.sampleData;

    // this.data = this.sampleData.map(item => ({ ...item, _checkbox_selector: item.id === 1 }));
    

  }


  

  onAngularGridCreated1(angularGrid: AngularGridInstance) {
    this.angularGrid = angularGrid;
    console.log("Angular Slickgrid created", angularGrid);
  }
  onAddClick() {
    if (this.form.valid) {
      const newData: any = {
        vendorName: this.form.value.vendorName.name,
        dateOfReport: this.form.value.dateOfReport,
        remark: this.form.value.remark,
        lipReport: this.selectedFileName,
        id: this.generateUniqueId(),
      };

      this.dataDuplicate.push(newData);
      this.selectedIds.push(newData.id);

      this.data = [...this.dataDuplicate]; // Update the data array

      this.form.reset();
      this.selectedFileName = '';
      this.cdr.detectChanges();
    }
  }

  
  generateUniqueId(): number {
    // You can implement your own logic to generate a unique ID
    // For example, using the length of the data array
    return this.dataDuplicate.length + 1;
  }

  onGridReady(grid: AngularGridInstance) {
    this.gridInstance = grid;
  }


  customCheckboxSelectorFormatter = (row: number, cell: number, value: any, columnDef: Column, dataContext: any) => {
    return value ? '<input type="checkbox" checked disabled>' : '<input type="checkbox" unchecked disabled>';
  };


  onAngularGridCreated(angularGrid: AngularGridInstance) {
    this.gridInstance = angularGrid;
    this.dataView = angularGrid.dataView; // Assign the dataView
    this.dataView.getItemMetadata = this.itemMetadataProvider; // Provide item metadata function
  }

  itemMetadataProvider = (rowNumber: number) => {
    const item = this.dataView.getItem(rowNumber);
    if (item && this.selectedIds.includes(item.id)) {
      return { cssClasses: 'green-checkbox' };
    }
    return null;
  };


  createColumnDefinitions() {
    this.columnDefinitions = [
      { id: 'vendorName', name: 'Vendor Name', field: 'vendorName', maxWidth: 420 },
      { id: 'dateOfReport', name: 'Date of Report', field: 'dateOfReport', maxWidth: 420 },
      { id: 'remark', name: 'Remark', field: 'remark', maxWidth: 420 },
      { id: 'lipReport', name: 'LIP Report', field: 'lipReport', maxWidth: 420 },
      {
        id: 'action',

        field: 'id',
        excludeFromColumnPicker: true,
        excludeFromGridMenu: true,
        excludeFromHeaderMenu: true,
        sortable: false,
        maxWidth: 30,
        formatter: Formatters.editIcon,
        onCellClick: this.onEditRow.bind(this)
      },
      {
        id: 'delete',
        name: 'Action',
        field: 'id',
        excludeFromColumnPicker: true,
        excludeFromGridMenu: true,
        excludeFromHeaderMenu: true,
        sortable: false,
        maxWidth: 70,
        formatter: Formatters.deleteIcon, // Make sure this is correctly set
        onCellClick: this.onDeleteRow.bind(this) // Bind the delete function to the cell click event
      },

    ];
  }

  onEditRow(event: Event, args: { row: number, dataContext: any }) {
  event.preventDefault();
  const { row, dataContext } = args;

  // Find the index of the item to edit
  const indexToEdit = this.dataDuplicate.findIndex(item => item.id === dataContext.id);

  if (indexToEdit !== -1) {
    this.form.patchValue({
      vendorName: dataContext.vendorName,
      dateOfReport: dataContext.dateOfReport,
      remark: dataContext.remark,
      lipReport: dataContext.lipReport
    });
    this.removeRow(dataContext.id);
    this.dataDuplicate.splice(indexToEdit, 1); // Remove the edited item from dataDuplicate

    this.cdr.detectChanges();
  }
}


  private removeRow(id: number) {
    this.dataDuplicate = this.dataDuplicate.filter(item => item.id !== id);
    this.selectedIds = this.selectedIds.filter(selectedId => selectedId !== id);

    if (this.angularGrid && this.angularGrid.dataView) {
      this.angularGrid.dataView.refresh();
    }

    this.data = this.data.filter(item => item.id !== id);
  }

  onDeleteRow(event: Event, args: { row: number, dataContext: any }) {
    event.preventDefault();
    const { row, dataContext } = args;

    const confirmDelete = confirm('Are you sure you want to delete this row?');
    if (!confirmDelete) {
      return;
    }

    this.removeRow(dataContext.id);

    this.cdr.detectChanges();
  }
  
  isFieldValid(field: string) {
    // console.log("Field116578",field);
    const formControl = this.form.get(field);
    return formControl ? formControl.valid && formControl.touched : false;
  } 


  isFieldTouched(field: string): boolean {
    const control = this.form.get(field);
    return control ? control.touched : false;
  }

  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    if (file) {
      this.selectedFileName = file.name; // Set the selected file name
      // Process the selected file as needed (upload, validation, etc.)
      console.log('Selected file:', file);
    }
  }

  clearFile() {
    this.selectedFileName = ''; // Clear thiiiie selected file name
    if (this.fileInput) {
      this.fileInput.nativeElement.value = null; // Clear the input element value
    }
  }

  }

  
  

 







