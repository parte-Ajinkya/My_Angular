import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators ,FormArray} from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AbstractControl } from '@angular/forms';
import { ChangeDetectorRef } from '@angular/core';
@Component({
  selector: 'app-world-check-form',
  templateUrl: './world-check-form.component.html',
  styleUrls: ['./world-check-form.component.css']
})
export class WorldCheckFormComponent implements OnInit {
  
  selectedFileName: string | null = null;
  uploadedFiles: any[] = []; // List to store uploaded files
  masterForm!: any;

  constructor(private toastr: ToastrService, private formBuilder: FormBuilder,private cdRef: ChangeDetectorRef) {}

  businessTableData = [
    // ... Your business data entries ...
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
  ];

  individualTableData = [
    // ... Your individual data entries ...
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
  ];

  reportOptions = [
    { label: 'Report1', value: 'report1' },
    { label: 'Report2', value: 'report2' },
    { label: 'Report3', value: 'report3' },
    // Add more report options here...
  ];

  ngOnInit() {
    this.initForm();
    this.initBusinessData();
    this.initIndividualData();
  }

  initForm() {
    this.masterForm = this.formBuilder.group({
      businessData: this.formBuilder.array([]),
      individualData: this.formBuilder.array([])
    });
  }

  initBusinessData() {
    const businessDataArray = this.masterForm.get('businessData') as FormArray;
    this.businessTableData.forEach(item => {
      const control = this.formBuilder.group({
        isChecked: new FormControl(false),
        CaseID: new FormControl(item.CaseID),
        BusinessName: new FormControl(item.BusinessName),
        Country: new FormControl(item.Country),
        DateOfLastRun: new FormControl(item.DateOfLastRun),
        Result: new FormControl(item.Result),
        OutstandingAction: new FormControl(item.OutstandingAction),
        CaseUpdate: new FormControl(item.CaseUpdate),
        Screen: new FormControl(item.Screen),
        ReportUploaded: new FormControl(item.ReportUploaded),
        FileUploadStatus: new FormControl(item.FileUploadStatus),
        selectedFileName: new FormControl(item.selectedFileName),
        showScreenMessage: new FormControl(item.showScreenMessage)
      });
      businessDataArray.push(control);
    });
  }

  initIndividualData() {
    const individualDataArray = this.masterForm.get('individualData') as FormArray;
    this.individualTableData.forEach(item => {
      const control = this.formBuilder.group({
        isChecked: new FormControl(false),
        CaseID: new FormControl(item.CaseID),
        IndividualName: new FormControl(item.IndividualName),
        Country: new FormControl(item.Country),
        DateOfLastRun: new FormControl(item.DateOfLastRun),
        Result: new FormControl(item.Result),
        OutstandingAction: new FormControl(item.OutstandingAction),
        CaseUpdate: new FormControl(item.CaseUpdate),
        Screen: new FormControl(item.Screen),
        ReportUploaded: new FormControl(item.ReportUploaded),
        FileUploadStatus: new FormControl(item.FileUploadStatus),
        selectedFileName: new FormControl(item.selectedFileName),
        showScreenMessage: new FormControl(item.showScreenMessage)
      });
      individualDataArray.push(control);
    });
  }



  submitData() {
    const selectedBusinessRows = this.masterForm.value.businessData.filter((item: { isChecked: any }) => item.isChecked);
    const selectedIndividualRows = this.masterForm.value.individualData.filter((item: { isChecked: any }) => item.isChecked);
    const combinedData = [...selectedBusinessRows, ...selectedIndividualRows];
  

   
  
    // ... Process combinedData ...
    console.log("selectedBusinessRows", selectedBusinessRows);
    console.log("selectedIndividualRows", selectedIndividualRows);
    console.log("Combined Data", combinedData);
    console.log('Uploaded Files:', this.uploadedFiles);
  
    this.toastr.success('Record saved successfully', 'Success');
  
    combinedData.forEach(row => {
      const uploadedFile = this.uploadedFiles.find(file => file.name === row.selectedFileName);
      if (uploadedFile) {
        row.FileUploadStatus = 'File uploaded successfully'; // Success message
      } else {
        row.FileUploadStatus = 'File upload failed'; // Failure message
      }
    });

    // selectedBusinessRows.forEach((formData: any) => {
    //   console.log('Business FormData:', formData);
    //   const fileName = formData.selectedFileName;
    //   if (this.uploadedFiles.some(file => file.name === fileName)) {
    //     formData.FileUploadStatus = 'File uploaded successfully';
    //   } else {
    //     formData.FileUploadStatus = 'File upload failed';
    //   }
    // });
  
    // selectedIndividualRows.forEach((formData: any) => {
    //   console.log('Individual FormData:', formData);
    //   const fileName = formData.selectedFileName;
    //   if (this.uploadedFiles.some(file => file.name === fileName)) {
    //     formData.FileUploadStatus = 'File uploaded successfully';
    //   } else {
    //     formData.FileUploadStatus = 'File upload failed';
    //   }
    // });
   // Trigger change detection to update the view
  this.cdRef.detectChanges();
    // Clear/reset data after submission
  
   
  }     
  

  onFileSelected(event: any, row: any) {
    const fileInput: HTMLInputElement | null = event.target;
    if (fileInput) {
        const selectedFile = fileInput.files ? fileInput.files[0] : null;
        if (selectedFile) {
            if (this.isValidFile(selectedFile)) {
                row.controls.selectedFileName.setValue(selectedFile.name);
                this.uploadedFiles.push(selectedFile); // Store uploaded file
                // row.controls.FileUploadStatus.setValue('File uploaded successfully');
                this.toastr.success('File uploaded successfully', 'Success');
            } else {
                // row.controls.FileUploadStatus.setValue('File upload failed');
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
    row.controls.showScreenMessage.setValue(true);
  }

  clearFile(row: any) {
    row.controls.selectedFileName.setValue(null);

    // ... Your file removal logic ...

    // Remove the uploaded file from the list
    const index = this.uploadedFiles.findIndex(file => file.name === row.controls.selectedFileName.value);
    if (index !== -1) {
      this.uploadedFiles.splice(index, 1);
    }
  }

  // ... Other methods ...
}
