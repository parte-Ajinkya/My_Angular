import { Component, OnInit } from '@angular/core';

import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-world-check',
  templateUrl: './world-check.component.html',
  styleUrls: ['./world-check.component.css']
})
export class WorldCheckComponent implements OnInit {

  selectedFileName: string | null = null;
  uploadedFiles: any[] = []; // List to store uploaded files


  constructor(private toastr: ToastrService) {} 
  businessTableData  = [
    {
      isChecked: false,
      CaseID: 12345,
      BusinessName: 'ABCD',
      Country: 'INDIA',
      DateOfLastRun: '2023-08-15',
      Result: 'Success',
      OutstandingAction: 0,
      CaseUpdate: 'No',
      
      Screen: 'Screen A',
      ReportUploaded: null,
      FileUploadStatus: null,
      selectedFileName: null,
      showScreenMessage: false // Add this property

    },
    {
      isChecked: false,
      CaseID: 67890,
      BusinessName: 'EFGH',
      Country: 'USA',
      DateOfLastRun: '2023-08-14',
      Result: 'Pending',
      OutstandingAction: 2,
      CaseUpdate: 'Yes',
      Screen: 'Screen B',
      ReportUploaded: null,
      FileUploadStatus: null,
      selectedFileName: null,
      showScreenMessage: false // Add this property

    },
    
    // Add more data entries as needed
  ];

  individualTableData = [
    {
      isChecked: false,
      CaseID: 54321, // Example CaseID for Individual
      IndividualName: 'XYZ Corp', // Example Business Name for Individual
      Country: 'Canada', // Example Country for Individual
      DateOfLastRun: '2023-08-15',
      Result: 'Success',
      OutstandingAction: 0,
      CaseUpdate: 'No',
      Screen: 'Screen C',
      ReportUploaded: null,
      FileUploadStatus: null,
      selectedFileName: null,
      showScreenMessage: false
    },
    {
      isChecked: false,
      CaseID: 87654,
      IndividualName: 'PQR Inc',
      Country: 'Japan',
      DateOfLastRun: '2023-08-14',
      Result: 'Pending',
      OutstandingAction: 2,
      CaseUpdate: 'Yes',
      Screen: 'Screen G',
      ReportUploaded: null,
       FileUploadStatus: ' ',
      selectedFileName: null,
      showScreenMessage: false
    },
    // Add more individual data entries as needed
  ];

  ngOnInit() {
    // Initialize selectedFileName and showScreenMessage for each row
    this.businessTableData .forEach(row => {
      row.selectedFileName = null;
      row.showScreenMessage = false; // New property to track screen button click
    });

    this.individualTableData.forEach(row => {
      row.selectedFileName = null;
      row.showScreenMessage = false;
    });

    
  }

  reportOptions = [
    { label: 'Report 1', value: 'report1' },
    { label: 'Report 2', value: 'report2' },
    { label: 'Report 3', value: 'report3' },
    // Add more report options here...
  ];
  
  submitData() {

    const selectedBusinessRows = this.businessTableData .filter(item => item.isChecked);
    selectedBusinessRows.forEach(row => {
      console.log('businessTableData Row Data:', row);
      
    });


    const selectedIndividualRows = this.individualTableData.filter(item => item.isChecked);
    selectedIndividualRows.forEach(row => {
      console.log('Individual Row Data:', row);
    });

    const combinedData = [...selectedBusinessRows, ...selectedIndividualRows];

    
    // combinedData.forEach(row => {
    //   console.log('Combined Row Data:', row);
      
    // });

    combinedData.forEach(row => {
      const uploadedFile = this.uploadedFiles.find(file => file.name === row.selectedFileName);
      if (uploadedFile) {
        row.FileUploadStatus = 'File uploaded successfully'; // Success message
      } else {
        row.FileUploadStatus = 'File upload failed'; // Failure message
      }
    });
    
    console.log('Combined Data:', combinedData);
    console.log('Uploaded Files:', this.uploadedFiles);
    // this.uploadedFiles.forEach(file => {
    //   console.log(file);
    // });

    this.toastr.success('Record saved successfully', 'Success');

    // Clear selected files and reset data
    this.uploadedFiles = [];
    this.businessTableData.forEach(row => {
      row.selectedFileName = null;
      row.ReportUploaded=null;
      row.isChecked = false;
      row.showScreenMessage = false;
    });
    this.individualTableData.forEach(row => {
      row.selectedFileName = null;
      row.ReportUploaded=null;
      row.isChecked = false;
      row.showScreenMessage = false;
    });




  }

  


  
  
  // onFileSelected(event: any, row: any) {
  //   const fileInput: HTMLInputElement | null = event.target;
  //   if (fileInput) {
  //     const file = fileInput.files ? fileInput.files[0] : null;
  //     if (file) {
  //       if (file.size <= 2 * 1024 * 1024 && file.type === 'application/pdf') {
  //         row.selectedFileName = file.name;
  //         this.uploadedFiles.push(file); // Store uploaded file in the list
  //       } else {
  //         console.log('Invalid file size or type');
  //       }
  //       fileInput.value = ''; // Clear the input value after file selection
  //     }
  //   }
  // }

  onFileSelected(event: any, row: any) {
    const fileInput: HTMLInputElement | null = event.target;
    if (fileInput) {
      const file = fileInput.files ? fileInput.files[0] : null;
      if (file) {
        if (this.isValidFile(file)) {
          row.selectedFileName = file.name;
          this.uploadedFiles.push(file);
          this.toastr.success('File uploaded successfully', 'Success'); // Show success toast
        } else {
       
          // Show an error toast using ngx-toastr
          this.toastr.error('Invalid file format or size. Please select a valid PDF file (max 2MB).', 'Error');
        }
        fileInput.value = '';
      }
    }
  }


  isValidFile(file: File): boolean {
    const allowedTypes = ['application/pdf'];
    const maxFileSize = 2 * 1024 * 1024; // 2MB in bytes
    return allowedTypes.includes(file.type) && file.size <= maxFileSize;
  }

  
  setScreenFlag(row: any) {
    row.showScreenMessage = true;
  }

  clearFile(row: any) {
    row.selectedFileName = null;
    // Remove the uploaded file from the list
    const index = this.uploadedFiles.findIndex(file => file.name === row.selectedFileName);
    if (index !== -1) {
      this.uploadedFiles.splice(index, 1);
    }
  }

  clearFileInput(fileInput: HTMLInputElement) {
    fileInput.value = ''; // Clear the input value if canceled
  }
}
