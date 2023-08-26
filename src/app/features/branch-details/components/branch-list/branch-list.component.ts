import { Component, ElementRef, Inject, OnInit,ViewChild ,EventEmitter, Output } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { HttpClient } from '@angular/common/http';
import { GridOption, Column ,OnEventArgs } from 'angular-slickgrid';
import { MatDialog ,MatDialogModule} from '@angular/material/dialog';
import { ChangeDetectorRef } from '@angular/core';
import { DialogboxComponent } from 'src/app/shared/helpers/dialogbox/dialogbox.component';
import { FullscreenOverlayContainer } from '@angular/cdk/overlay';
import { MatDialogRef,MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Formatters } from 'angular-slickgrid';
import { event } from 'jquery';
import { ApiService } from 'src/app/shared/helpers/modal/api.services';
import { ApiFacadeService } from '../../branch.facade';
import { Router ,ParamMap,Params} from '@angular/router';
import { GlobalUrlService } from 'src/app/shared/helpers/modal/global-url';
import { saveAs } from 'file-saver';
import * as XLSX from 'xlsx';
import { log } from 'console';
import { QueryParamsHandling } from '@angular/router';
import { combineLatest } from 'rxjs';
import { MatCheckboxChange } from '@angular/material/checkbox';
// import { AngularSlickgridModule } from 'angular-slickgrid';
@Component({
  selector: 'app-branch-list',
  templateUrl: './branch-list.component.html',
  styleUrls: ['./branch-list.component.css']
})
export class BranchListComponent implements OnInit {

  @Output() isAnchorTaggedTagged: EventEmitter<boolean> = new EventEmitter<boolean>();
  [x: string]: any;
  private importedData: any;
  showImportContainer = false;
  @ViewChild('fileInput') fileInput!: ElementRef;
  draggedFiles: File[] = [];
  
  paginationConfigForListGrid: any = {
    totalItems: 0,
    itemsPerPage: 350,
    currentPage: 1,
  };
  selectedFile: File | null = null;
  // loggedInUserId: string = 'user';
  loggedInUserId: string = 'admin';
  columnDefinitions1: Column[] = [];
  gridOptions1!: GridOption;
  dataset1!: any[];
  page = 1;
  pageSize = 10;
  totalPages = 0;

  currentPage = 1;

  branches: any = [];
  length:any;
  countryary:any=[];
  regionary:any=[];
  designationary:any=[];
  
  selectedItemId!: number;
  constructor(private http: HttpClient,private toastr: ToastrService, private apiFacadeService: ApiService,public dialog: MatDialog, private branchFacade: ApiFacadeService, private router: Router,private cdr: ChangeDetectorRef) { }

  ngOnInit(): void {
    if (this.loggedInUserId === 'admin'){
    this.columnDefinitions1 = [
      { id: 'isAnchorTagged', name: 'anchor', field: 'isAnchorTagged', maxWidth: 100, formatter: this.anchorTagFormatter },
      { id: 'sequence', name: 'sequence', field: 'sequence', sortable: true,filterable:true,maxWidth:350 },
      { id: 'branchName', name: 'branchName', field: 'branchName', sortable: true ,filterable:true ,maxWidth:350},
      { id: 'branchCode', name: 'branchCode', field: 'branchCode', sortable: true,filterable:true ,maxWidth:350},
      { id: 'address', name: 'address', field: 'address', sortable: true,filterable:true,maxWidth:350 },
      { id: 'description', name: 'description', field: 'description', sortable: true ,filterable:true,maxWidth:350},
      { id: 'status', name: 'status', field: 'status', sortable: true,filterable:true,maxWidth:350,formatter: this.statusFormatter },
      {
        id: 'action',

        field: 'id',
        excludeFromColumnPicker: true,
        excludeFromGridMenu: true,
        excludeFromHeaderMenu: true,
        sortable: false,
        maxWidth: 50,
        onCellClick: (e: Event, args: OnEventArgs) => {
          console.log("args.dataContext",args.dataContext.branchId);
          this.selectedItemId = args.dataContext.branchId;
          console.log("branch_id ",this.selectedItemId);
          this.router.navigate(['/branch/form'], { queryParams: { selectedItemId: args.dataContext.branchId} })
          // this.openDialog(e, args);
        },
        formatter: Formatters.editIcon 
      },
      {
        id: 'delete',
        name: 'Action',
        field: 'id',
        excludeFromColumnPicker: true,
        excludeFromGridMenu: true,
        excludeFromHeaderMenu: true,
        sortable: false,
        maxWidth: 50,
        onCellClick: (e: Event, args: OnEventArgs) => {
          console.log("args.dataContext",args.dataContext.branchId);
          this.selectedItemId = args.dataContext.branchId;
          this.openDialog(e, args);
          
        },
        formatter: Formatters.deleteIcon
      },
      {
        id: 'clone',

        field: 'id',
        excludeFromColumnPicker: true,
        excludeFromGridMenu: true,
        excludeFromHeaderMenu: true,
        sortable: false,
        maxWidth: 50,
        onCellClick: (e: Event, args: OnEventArgs) => {
          console.log("args.dataContext",args.dataContext.branchId);
          this.selectedItemId = args.dataContext.branchId;
          console.log("branch_id ",this.selectedItemId);
          this.router.navigate(['/branch/form'], { queryParams: { selectedItemId: args.dataContext.branchId,cloneFlag:1} })
          // this.openDialog(e, args);
        },
        formatter: this.cloneIconFormatter // Use the custom formatter function
        
      }
    ];
  }
  else
  {
    this.columnDefinitions1 = [
      { id: 'isAnchorTagged', name: 'anchor', field: 'isAnchorTagged', maxWidth: 100, formatter: this.anchorTagFormatter },
      { id: 'sequence', name: 'sequence', field: 'sequence', sortable: true,filterable:true,maxWidth:350 },
      { id: 'branchName', name: 'branchName', field: 'branchName', sortable: true ,filterable:true ,maxWidth:350},
      { id: 'branchCode', name: 'branchCode', field: 'branchCode', sortable: true,filterable:true ,maxWidth:350},
      { id: 'address', name: 'address', field: 'address', sortable: true,filterable:true,maxWidth:350 },
      { id: 'description', name: 'description', field: 'description', sortable: true ,filterable:true,maxWidth:350},
      { id: 'status', name: 'status', field: 'isActive', sortable: true,filterable:true,maxWidth:350,formatter: this.statusFormatter},
     

      {
        id: 'action',

        field: 'id',
        excludeFromColumnPicker: true,
        excludeFromGridMenu: true,
        excludeFromHeaderMenu: true,
        sortable: false,
        maxWidth: 50,
        onCellClick: (e: Event, args: OnEventArgs) => {
          if (args.dataContext.isAnchorTagged!== true && this.loggedInUserId === 'user') {
            this.selectedItemId = args.dataContext.branchId;
            this.router.navigate(['/branch/form'], { queryParams: { selectedItemId: args.dataContext.branchId } });
          }
        },

        formatter: (row: number, cell: number, value: any, columnDef: Column, dataContext: any) => {
          if (dataContext.isAnchorTagged !== true) {
            return `<i class="fa fa-edit clickable" style="cursor: pointer;" title="Edit"></i>`;
          }
          else return '<i class="fa fa-edit faded-icon" title="Edit"></i>';

        }
      },
      
      {
        id: 'delete',
        name: 'Action',
        field: 'id',
        excludeFromColumnPicker: true,
        excludeFromGridMenu: true,
        excludeFromHeaderMenu: true,
        sortable: false,
        maxWidth: 50,
        onCellClick: (e: Event, args: OnEventArgs) => {
          if (args.dataContext.isAnchorTagged !== true && this.loggedInUserId === 'user') {
            this.selectedItemId = args.dataContext.branchId;
            this.openDialog(e, args);
          }
        },
        formatter: (row: number, cell: number, value: any, columnDef: Column, dataContext: any) => {
          if (dataContext.isAnchorTagged !== true && this.loggedInUserId === 'user') {
            return `<i class="fa fa-trash clickable" style="cursor: pointer;" title="Delete"></i>`;
          } else {
            return '<i class="fa fa-trash faded-icon" title="Delete"></i>';
          }
        }
      },
      
      {
        id: 'clone',
        field: 'id',
        excludeFromColumnPicker: true,
        excludeFromGridMenu: true,
        excludeFromHeaderMenu: true,
        sortable: false,
        maxWidth: 50,
        onCellClick: (e: Event, args: OnEventArgs) => {
          if (args.dataContext.isAnchorTagged !== true && this.loggedInUserId === 'user') {
            console.log("args.dataContext", args.dataContext.branchId);
            this.selectedItemId = args.dataContext.pincodeId;
            console.log(this.selectedItemId);
            this.router.navigate(['/branch/form'], { queryParams: { selectedItemId: args.dataContext.branchId, cloneFlag: 1 } });
          }
        },
        formatter: (row: number, cell: number, value: any, columnDef: Column, dataContext: any) => {
          if (dataContext.isAnchorTagged !== true && this.loggedInUserId === 'user') {
            return `<i class="fa fa-clone clickable" style="cursor: pointer;" title="Clone"></i>`;
          } else {
            return '<i class="fa fa-clone faded-icon" title="Clone"></i>';
          }
        }
      }
    ];
  }
    this.gridOptions1 = {

      enableAutoResize: false,
      enableSorting: true,
      gridHeight: 500,
      gridWidth: 1800,
      enableFiltering: true,
      enableCellNavigation: true,
   
      // enablePagination: true, // Enable pagination
      // pagination: {
      //   pageSizes: [10, 25, 50], // Set the available page sizes (optional)
      //   pageSize: 10, // Set the initial page size (optional)
      //   pageNumber: 1, // Set the initial page number (optional)
      //   totalItems: 100, // Set the total number of items in your dataset (required)
      // },
    };

   
    this.getAllBranchs(this.paginationConfigForListGrid.currentPage, this.paginationConfigForListGrid.itemsPerPage);
   
  }

  

  anchorTagFormatter(row: number, cell: number, value: any, columnDef: Column, dataContext: any): string {
    console.log(dataContext);

    if (dataContext.isAnchorTagged == true) {

      return '<i class="fa-solid fa-anchor" style="cursor: pointer;"></i>';

    } else {
      return '';
    }

  }


  onAnchorTagChange(item: any, event: MatCheckboxChange): void {
    item.isAnchorTagged = event.checked;
    this['angularGridInstances'].forEach((grid: { dataView: { refresh: () => any; }; }) => grid?.dataView?.refresh());
    this.cdr.detectChanges();
  }

  handleAnchorTagged(value: boolean): void {
    console.log('isAnchorTagged tag value---------------:', value);
    // Do whatever you need to do with the isAnchorTagged tag value here
  }

  

  // onImportClicked(): void {

  // }
  // onFileSelected(event: any): void {
  //   const file = event.target.files[0];
  //   if (file) {
  //     this.readFileContents(file);
  //   }
  // }


  // onDragOver(event: any): void {
  //   event.preventDefault();
  // }


  // onFileDropped(event: any): void {
  //   event.preventDefault();
  //   const files = event.dataTransfer.files;
  //   if (files.length > 0) {
  //     for (let i = 0; i < files.length; i++) {
  //       this.draggedFiles.push(files[i]);
  //     }
  //   }
  // }

  // readFileContents(file: File): void {
  //   const reader = new FileReader();
  //   reader.onload = (event: any) => {
  //     const contents = event.target.result;
  //     this.dataset1 = JSON.parse(contents);
  //     this['angularGridInstances'].forEach((grid: { dataView: { refresh: () => any; }; }) => grid?.dataView?.refresh());
  //   };
  //   reader.readAsText(file);
  // }


  // removeDraggedFile(file: File): void {
  //   this.draggedFiles = this.draggedFiles.filter((f) => f !== file);
  // }


  // toggleImportContainer(): void {
  //   this.showImportContainer = !this.showImportContainer;
  //   if (!this.showImportContainer) {
  //     this.draggedFiles = [];
  //   }
  // }



  onFileSelected(event: Event): void {
    const inputElement = event.target as HTMLInputElement;

    if (inputElement.files && inputElement.files.length > 0) {
      // Call the importFiles method to start the import process
      this.branchFacade.importFiles(inputElement.files);
      this.getAllBranchs(this.paginationConfigForListGrid.currentPage, this.paginationConfigForListGrid.itemsPerPage);
    }
  }
  
  clearFileSelection(): void {
    this.selectedFile = null;
    const fileInput = document.getElementById('fileInput') as HTMLInputElement;
    if (fileInput) {
      fileInput.value = '';
    }
  }
  
  importFile(): void {
    if (this.selectedFile) {
      // Here, you can process the selected file for import using your desired logic.
      // For example, you can read the file content and perform the necessary operations.
      // Once the import is successful, you can clear the file selection if needed.
      this.clearFileSelection();
    }
  }

  addBranch() {

    this.router.navigate(['/branch/form']);
  }

  openDialog(action: any, obj: any){ 

    obj.action = action;

    console.log("Inside the dialog ");
   const dialogRef= this.dialog.open(DialogboxComponent, {  

      width: '250px',
      data: { message: 'Do you want to delete this item?' }
        })
    
        
      //  const result=this.box.onYesClick();
      // this.dialog.afterAllClosed.subscribe((result:any) => {
      //   console.log(result);
      //   result=true;
      //   if (result) {
         
      //     console.log("Inside the dialog 2234");

      //     this.branchFacade.deleteItemById(this.selectedItemId);
        
      //   }
      // });


      //  const result=this.box.onYesClick();
    dialogRef.afterClosed().subscribe((result:boolean) => {
      // console.log(result);
        // result=true;
      if (result === true) {
        console.log("Inside the dialog 2234");
        // this.branchFacade.deleteItemById(this.selectedItemId);
        this.deleteData();
      }
    });


    // this.dialogRef.afterClosed().subscribe((result: { event: string; }) => {
    //     if (result.event == 'delete') {
    //       this.deleteData();
    //     }
  
    //   });
   }

   downloadTemplate(){
    const csvContent = this.convertToCSV([]);
    const blob = new Blob([csvContent], { type: 'text/csv' });
  
    // Trigger the download using FileSaver.js
    saveAs(blob,'exported_data.csv');
  }


  downloadTemplate1(): void {
    this.branchFacade.downloadTemplate().subscribe(
      (data: Blob) => {
        const blobURL = URL.createObjectURL(data);
        const link = document.createElement('a');
        link.href = blobURL;
        link.download = 'template.xlsx'; 
        link.click();
      },
      (error) => {
        console.error('Error downloading template:', error);
      }
    );


  }
   async deleteData() {
    console.log("Selected item",this.selectedItemId);
    await this.branchFacade.deleteItemById(this.selectedItemId)
    console.log("branch_id", this.selectedItemId);
    this.toastr.success('Record deleted successfully!', 'Success');
    this.getAllBranchs(this.paginationConfigForListGrid.currentPage, this.paginationConfigForListGrid.itemsPerPage);
    this.router.navigate(['/branch/list']);
   }

   
  


   
  
        
 

  
  
  
  // exportData(): void {
    
  //   const csvContent = this.convertToCSV(this.dataset1);
  
    
  //   const blob = new Blob([csvContent], { type: 'text/csv' });
  

  //   saveAs(blob, 'exported_data.csv');
  // }
  

  exportData(): void {

    const exportUrl = GlobalUrlService.export;
  this.apiFacadeService.downloadFile(exportUrl).subscribe(
    (data) => {
      // Handle the exported data here (e.g., save it to a file or display a success notification)
      console.log('Exported data:', data);
      this.toastr.success('Data exported successfully!', 'Success');
    },
    (error) => {
      console.error('Error exporting data:', error);
      this.toastr.error('Error exporting data', 'Error');
    }
  );
    const wb = XLSX.utils.book_new();
    const ws = XLSX.utils.json_to_sheet(this.dataset1); // Assuming data is an array of objects

    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
    const wbout = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
    const blob = new Blob([wbout], { type: 'application/octet-stream' });
    saveAs(blob, 'exported_data.xlsx');

    console.log('Exported============>')
  }

  

  convertToCSV(data: any[]): string {
    let csvContent = 'isAnchorTagged,sequence,branchName,branchCode ,address ,description\n';


    // Iterate through the data and add each row to the CSV content
    for (const item of data) {
      const row = `${item.isAnchorTagged},${item.sequence},${item.branchName},${item.branchCode},${item.address},${item.description}\n`;  // here you must replace sequence , ifscCode and micrCode to your column titles of list 
      csvContent += row;
    }

    return csvContent;
  }

  async getAllBranchs(pageNumber: number, pageSize: number) {
    console.log('inside getAllBranchs facade')
    return new Promise(resolve => {
      return this.apiFacadeService.getDetailsPagination(GlobalUrlService.branch, pageNumber, pageSize).subscribe((res: any) => {
        console.log("ress==>", res);

        this.branches = res.data;
        console.log("this.branches", this.branches);

        this.branches.forEach((item: { id: any; }, index: number) => {
          item.id = index + 1;
        });
        this.dataset1 = this.branches;
        console.log("this.branches==", this.dataset1);

        console.log("branches==========", this.branches);
        resolve(this.branches);
      });
    })

  }


  statusFormatter( value: any): string {
    if (value==true) {
      return '<span style="color: green;">Active</span>';
    } else {
      return '<span style="color: red;">Inactive</span>';
    }
  }
 

  addNewUser(): void {
    // Logic for adding a new user
  }

  

 
  cloneIconFormatter(row: number, cell: number, value: any, columnDef: Column, dataContext: any): string {
    return `<i class="fa fa-clone clickable" style="cursor: pointer;"></i>`;
  }

  onPreviousPage(): void {
    if (this.page > 1) {
      this.page--;
    }
  }

  onNextPage(): void {
    if (this.page < this.totalPages) {
      this.page++;
    }
  }

  getPaginatedData(): any[] {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    return this.dataset1.slice(startIndex, endIndex);
  }
  pageChange(page: number): void {
    this.currentPage = page;
  }


}


