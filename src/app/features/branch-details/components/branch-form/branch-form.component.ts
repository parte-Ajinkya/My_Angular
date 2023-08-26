



import { Component, OnInit ,EventEmitter, Output} from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/shared/helpers/modal/api.services';
import { ApiFacadeService } from '../../branch.facade';
import { HttpClient } from '@angular/common/http';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { FullscreenOverlayContainer } from '@angular/cdk/overlay';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { BackdialogComponent } from 'src/app/shared/helpers/backdialog/backdialog.component';
import { GlobalUrlService } from 'src/app/shared/helpers/modal/global-url';
import { FormBuilder, FormGroup, Validators, FormArray, FormControl, ValidatorFn, AbstractControl, ValidationErrors } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { combineLatest } from 'rxjs';
@Component({
  selector: 'app-branch-form',
  templateUrl: './branch-form.component.html',
  styleUrls: ['./branch-form.component.css']
})
export class BranchFormComponent implements OnInit {

  @Output() anchorTagged: EventEmitter<boolean> = new EventEmitter<boolean>();

  radioOptionsYesNo: any = [
    {
      "rowId": true,
      "title": "Yes"
    },
    {
      "rowId": false,
      "title": "No"
    }
  ];
  form!: FormGroup;
  fromDateControl: any;
  toDateControl: any;
  countryary: any = [];
  regionary: any = [];
  stateary: any = [];
  stateary1: any = [];
  roleary: any = [];
  gstpincodeary:any=[];
  cityary: any = [];
  pincodeary: any = [];
  parentary: any = [];
  designationary1: any = [];
  designationary: any = [];
  branchmanagerary: any = [];
  listOfBranchRecordForEdit: any;
  minDate!: Date;
  formSaved: boolean = false;
  createdBy: any;
  createdDate: any;
  params: any;
  createBranch!: boolean;
  saveBranchResp: any;
  num!: any;
  selectedPincode: any=[];
  selectedGstPincode:any=[];
  selectedRegion: any=[];
  selectedCity: any=[];
  selectedState:any=[];
  selectedCountry:any=[];
  constructor(private fb: FormBuilder, private activateRoute: ActivatedRoute, public dialog: MatDialog, private toastr: ToastrService, private router: Router, private http: HttpClient, private apiFacadeService: ApiService, private branchFacade: ApiFacadeService) {
    this.activateRoute.queryParams.subscribe(params => {
      this.params = params;
      console.log("this.params", this.params);
    })
  }





  contactTypes = [
    { value: 'ct1', label: 'Mobile' },
    { value: 'ct2', label: 'Telephone' },
    { value: 'ct3', label: 'Others' },
    // Add more options as needed...
  ];
  listOfCountries: string[] = ['USA', 'Canada', 'UK', 'Australia', 'India'];
 


  ngOnInit(): void {
    this.form = this.fb.group({
      branchName: [null, [Validators.required, Validators.pattern('^[a-zA-Z0-9]*$')]],
      branchCode: [null, [Validators.required, Validators.pattern('^[a-zA-Z0-9]*$')]],
      parentBranchId: [null],
      customId: [null, [Validators.required]],
      // allowedUsers: [null, [Validators.required]],
      description: [null, [Validators.pattern('^[a-zA-Z]*$')]],
      targetInCr: [null, [Validators.required, Validators.pattern('^[0-9]*$')]],
      isRestricted: [false],
      isExcluded: [false],


      fromDate: ['', [Validators.required, this.dateValidator()]],
      isActive: [false],



      toDate: ['', null],
      isAnchorTagged: [true],

      sequence: [null, [Validators.required, Validators.pattern('^[0-9]*$')]],


      address: [null, [Validators.required, Validators.pattern('^[a-zA-Z]*$')]],
      stateId: [null, Validators.required],
      cityId: [null, Validators.required],
      pincodeId: [null, [Validators.required]],
      regionId: [null, [Validators.required]],
      // street: ['', Validators.required],
      countryId: [null, Validators.required],


      branchManagerId: [null],
      branchEmailId: [null, [Validators.email]],
      designationId: [null],
      // contactDetails: this.fb.array([

      // ]),


      gstNumber: [null, [Validators.required, Validators.pattern('^[a-zA-Z0-9]*$')]],
      gstRegistrationDate: [null, [Validators.required]],
      gstRegistrationAddress: [null, [Validators.pattern('^[a-zA-Z]*$')]],
      gstRegistrationPincodeId: [null],
      gstRegistrationStateId: [null,]
    });


    // this.addContactDetails();
    this.getAllBranchesCountry();
    this.getAllBranchesRegion();
    this.getAllBranchesState();
    this.getAllBranchesGstState();
    this.getAllBranchesCity();
    this.getAllBranchesPincode();
    this.getAllBranchesParent();
    // this.getAllBranchesRoles();
    this.getAllBranchesDesignation();
    this.getAllBranchesGstPincode();
    this.getAllBranchesManager();
    this.getAllBranchesGstPincode();
    // this.saveBranch();
    this.minDate = new Date();
    this.getBranchById();
    this.getNextSequen();
    // this.form.get('isActive')?.setValue(false);
  }


  async getNextSequen() {
    this.num = await this.branchFacade.getNextSequence();
    console.log("this.sequence ", this.num);

    this.form.get('sequence')?.patchValue(this.num);
  }

 async value(event: any) {
    console.log("Clicked", event);
    this.selectedPincode=event;
    console.log("this.selectedpincode",this.selectedPincode);

    if(!this.selectedPincode)
    {
    
      this.form.controls['cityId'].setValue(null);
      this.form.controls['stateId'].setValue(null);
      this.form.controls['regionId'].setValue(null);
      this.form.controls['countryId'].setValue(null);
    }
    else{
        await this.setValueOnPincode(this.selectedPincode);
    }
  }
 
  async setValueOnPincode(event:any)
  {
    this.selectedPincode=event;
    console.log("event -->>>>",this.selectedPincode);
    const regionId =this.selectedPincode.regionId;
    this.selectedRegion[0]=await this.regionary.find((data:any)=>data.regionId === regionId);
    this.form.controls['regionId'].setValue(regionId);
    console.log("this.selectedRegion ",this.selectedRegion);

    const cityId =this.selectedPincode.cityId;
    this.selectedCity[0]=await this.selectedCity.find((data:any)=>data.cityId === cityId);
    this.form.controls['cityId'].setValue(cityId);
    console.log("this.selectedcity ",this.selectedCity);

    const stateId =this.selectedPincode.stateId;
    this.selectedState[0]=await this.selectedState.find((data:any)=>data.stateId === stateId);
    this.form.controls['stateId'].setValue(stateId);
    console.log("this.selectedState ",this.selectedState);

    const countryId = this.selectedPincode.countryId;
    this.selectedCountry[0]=await this.selectedCountry.find((data:any)=>data.countryId === countryId);
    this.form.controls['countryId'].setValue(countryId);
    console.log("this.selectedCountry ",this.selectedCountry);


  }

  async gstPincodeValue(event: any)
  {
    console.log("Clicked", event);
    this.selectedGstPincode=event;
    console.log("this.selectedpincode",this.selectedGstPincode);
    if(!this.selectedGstPincode)
    {
      this.form.controls['gstRegistrationStateId'].setValue(null);

    }
    else{
      await this.setValueOnGstPincode(this.selectedGstPincode);
    }
  
  }

  async setValueOnGstPincode(event:any)
  {

    this.selectedGstPincode=event;
    console.log("Gstevent -->>>>",this.selectedGstPincode);
    const stateId =this.selectedGstPincode.stateId;
    this.selectedState[0]=await this.stateary.find((data:any)=>data.stateId === stateId);
    this.form.controls['gstRegistrationStateId'].setValue(stateId);
    console.log("this.selectedGsState ",this.selectedState);

  }


  async getAllBranchesCountry() {
    this.countryary = await this.branchFacade.getAllBranchByCountry();
    this.selectedCountry=this.countryary;
    console.log("this.countryary", this.countryary);
  }
  async getAllBranchesCity() {
    this.cityary = await this.branchFacade.getAllBranchByCity();
    this.selectedCity=this.cityary;
    console.log("this.cityary", this.cityary);
  }
  async getAllBranchesPincode() {
    this.pincodeary = await this.branchFacade.getAllBranchByPincode();
    console.log("this.pincodeary", this.pincodeary);
  }

  async getAllBranchesManager() {
    this.branchmanagerary = await this.branchFacade.getAllBranchByManager();
    console.log("this.Manager", this.branchmanagerary);
  }
  async getAllBranchesState() {
    this.stateary = await this.branchFacade.getAllBranchByState();
    this.selectedState=this.stateary;
    console.log("this.state", this.stateary);
  }

  async getAllBranchesGstState() {
    this.stateary1 = await this.branchFacade.getAllBranchByState1();
    console.log("this.GstState", this.stateary1);
  }

  async getAllBranchesRoles() {
    this.roleary = await this.branchFacade.getAllBranchByRoles();
    console.log("this.GstState", this.roleary);
  }

  async getAllBranchesParent() {
    this.parentary = await this.branchFacade.getAllBranchByParentBranch();
    console.log("this.branches", this.parentary);
  }

  async getAllBranchesDesignation() {
    this.designationary = await this.branchFacade.getAllBranchByDesignation();
    console.log("this.designation", this.designationary);
  }

  async getAllBranchesGstPincode() {
    this.gstpincodeary = await this.branchFacade.getAllBranchByGstPincode();
    console.log("this.designation", this.designationary1);
  }



  get contactDetails() {
    return this.form.get("contactDetails") as FormArray;
  }

  async getAllBranchesRegion() {
    this.regionary = await this.branchFacade.getAllBranchByRegion();
    this.selectedRegion=this.regionary;
    console.log("this.region", this.regionary);
  }


  async getBranchById() {
    console.log("inside listOfBranchForId", this.params.selectedItemId);
    if (this.params && this.params.selectedItemId) {
      this.listOfBranchRecordForEdit = await this.branchFacade.getBranchById(this.params.selectedItemId);
      console.log("this.listOfbranchRecordForEdit===========", this.listOfBranchRecordForEdit);
      this.createBranch = false;

      this.form.patchValue({
        branchName: this.listOfBranchRecordForEdit.branchName,
        branchCode: this.listOfBranchRecordForEdit.branchCode,
        parentBranchId: this.listOfBranchRecordForEdit.parentBranchId,
        customId: this.listOfBranchRecordForEdit.customId,
        description: this.listOfBranchRecordForEdit.description,
        targetInCr: this.listOfBranchRecordForEdit.targetInCr,
        isRestricted: this.listOfBranchRecordForEdit.isRestricted,
        isExcluded: this.listOfBranchRecordForEdit.isExcluded,
        fromDate: this.listOfBranchRecordForEdit.fromDate,
        toDate: this.listOfBranchRecordForEdit.toDate,
        isAnchorTagged: this.listOfBranchRecordForEdit.isAnchorTagged,
        isActive: this.listOfBranchRecordForEdit.isActive,
        sequence: this.listOfBranchRecordForEdit.sequence,
        address: this.listOfBranchRecordForEdit.address,
        stateId: this.listOfBranchRecordForEdit.stateId,
        cityId: this.listOfBranchRecordForEdit.cityId,
        pincodeId: this.listOfBranchRecordForEdit.pincodeId,
        regionId: this.listOfBranchRecordForEdit.regionId,
        countryId: this.listOfBranchRecordForEdit.countryId,
        branchManagerId: this.listOfBranchRecordForEdit.branchManagerId,
        branchEmailId: this.listOfBranchRecordForEdit.branchEmailId,
        designationId: this.listOfBranchRecordForEdit.designationId,
        gstNumber: this.listOfBranchRecordForEdit.gstNumber,
        gstRegistrationDate: this.listOfBranchRecordForEdit.gstRegistrationDate,
        gstRegistrationAddress: this.listOfBranchRecordForEdit.gstRegistrationAddress,
        gstRegistrationPincodeId: this.listOfBranchRecordForEdit.gstRegistrationPincodeId,
        gstRegistrationStateId: this.listOfBranchRecordForEdit.gstRegistrationStateId,
      })

    }
    else {
      this.createBranch = true;
    }
  }

  onAnchorTagChange(event: any): void {
    console.log("AnchorEvent --> ",event);
   this.anchorTagged.emit(event);
   
 }


  //  async saveBranch()
  //   {
  //     this.createdBy="3fa85f64-5717-4562-b3fc-2c963f66afa6"
  //     this.createdDate="2023-07-20T07:16:13.948Z"
  //    const payload= this.form.value;
  //    payload.createdBy=this.createdBy
  //    payload.createdDate=this.createdDate
  //   //  payload['branchId']=0;
  //    await this.branchFacade.saveFormInput(payload);
  //   }

  //   saveBranch() {
  //     if (this.MasterFrm.valid) {
  //       this.loading=true;      
  //       var payload;
  //       if (this.params.api_id) {
  //         Object.assign(this.selectedRecordForEdit, this.MasterFrm.value);
  //         payload = this.selectedRecordForEdit;
  //       }
  //       else {
  //         payload = this.MasterFrm.value;
  //         payload["created_by"] = this.createdBy
  //         if (payload.parent_branch_id === null) {
  //           payload.parent_branch_id = 0
  //         }
  //       }  
  //       this.savedData = this.userManagementFacade.saveBranchForm(payload);
  //       this.loading=false; 
  //       if (('Success' in this.savedData) && this.savedData.Success == false) {
  //         if (('Message' in this.savedData) && this.savedData.Message.includes('duplicate'))
  //           this.notifyService.showError(this.commonMessages.BRANCH_NAME_ALREADY_EXISTS, "")
  //       } else {
  //         if (this.params.api_id) {
  //           this.notifyService.showSuccess(this.commonMessages.DATA_UPDATED_SUCCESSFULLY, "")
  //         }
  //         else {
  //           console.log('form submitted=====>');
  //           this.notifyService.showSuccess(this.commonMessages.DATA_SAVED_SUCCESSFULLY, "")
  //         }
  //         this.router.navigate(['user-management/branch/list']);
  //       }
  //   }

  // }

  addContactDetails() {
    const contactForm = this.fb.group({
      contactType: ['', [Validators.required]],
      contactNumber: ['', [Validators.required, Validators.min(10)]]
    });
    this.contactDetails.push(contactForm);
  }

  deleteDetails(contactIndex: number) {
    this.contactDetails.removeAt(contactIndex);
  }

  onFromDateChange() {
    const fromDateValue = this.form.get('fromDate')?.value;
    const currentDate = new Date();
    currentDate.setHours(0, 0, 0, 0);

    if (fromDateValue === this.getFormattedDate(currentDate)) {
      this.form.get('isActive')?.setValue(true);
      this.form.get('toDate')?.enable();
    } else {
      this.form.get('isActive')?.setValue(false);
      this.form.get('toDate')?.disable();
    }
  }

  onToDateChange() {
    const toDateValue = this.form.get('toDate')?.value;
    const currentDate = new Date();
    currentDate.setHours(0, 0, 0, 0);

    if (toDateValue === this.getFormattedDate(currentDate)) {
      this.form.get('isActive')?.setValue(true);
    } else {
      this.form.get('isActive')?.setValue(false);
    }
  }

  getFormattedDate(date: Date): string {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
  }
  dateValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      const selectedDate = new Date(control.value);
      const currentDate = new Date();
      currentDate.setHours(0, 0, 0, 0);

      if (selectedDate < currentDate) {
        control.parent?.get('toDate')?.disable();
        control.parent?.get('isActive')?.setValue(false);
        return { 'invalidDate': true };
      } else {
        control.parent?.get('toDate')?.enable();
        control.parent?.get('isActive')?.setValue(true);
      }

      return null;
    };
  }

  getMinToDate(): Date | null {
    const fromDateControl = this.form.get('fromDate');
    if (fromDateControl && fromDateControl.value) {
      return new Date(fromDateControl.value);
    }
    return null;
  }

  hasControlErrors(controlName: string): boolean {
    if (controlName === 'toDate') {
      return false; // Exclude To Date field from error check
    }
    const control = this.form.get(`form.${controlName}`);
    return control ? control.touched && control.invalid : false;
  }

  markControlsAsPristine() {
    const formInfo = this.form.get('form');
    if (formInfo) {
      formInfo.markAsPristine();
      formInfo.setErrors(null);
      Object.keys(this.form.controls).forEach(controlName => {
        const control = formInfo.get(controlName);
        if (control) {
          control.markAsPristine();
          control.setErrors(null);
        }
      });
    }
  }

  // onSave(): void {



  //   if (this.form.valid) {
  //     console.log(this.form.value);
  //     this.createdBy="3fa85f64-5717-4562-b3fc-2c963f66afa6"
  //   this.createdDate="2023-07-20T07:16:13.948Z"
  //  const payload= this.form.value;
  //  payload.createdBy=this.createdBy
  //  payload.createdDate=this.createdDate

  //       this.branchFacade.saveFormInput(payload);
  //       console.log("payload===>",payload);

  //       this.toastr.success('Record saved successfully!', 'Success');

  //       this.router.navigate(['/branch/list']);
  //     this.form.reset(); // Reset the form after saving
  //     this.markControlsAsPristine(); // Mark all controls as pristine after reset
  //     this.formSaved = true; // Set the flag to true after successful save
  //   } else {
  //     this.toastr.error('Please fill in all the required fields.', 'Error');

  //     if (this.formSaved) {
  //       this.clearInvalidToaster(); // Clear the invalid toaster if the form has been saved
  //     }
  //   }
  // }


  onSave(param: any): void {



    if (this.form.valid) {
      var payload: any = {};
      this.createdBy = "3fa85f64-5717-4562-b3fc-2c963f66afa6"
      this.createdDate = "2023-07-20T07:16:13.948Z"
      payload = this.form.value;
      payload.createdBy = this.createdBy
      payload.createdDate = this.createdDate


      if (this.params.selectedItemId && this.params.cloneFlag) {
        this.listOfBranchRecordForEdit = { ... this.form.value };
        payload = { ...this.listOfBranchRecordForEdit, selectedItemId: 0, createdBy: "3fa85f64-5717-4562-b3fc-2c963f66afa6" };
        console.log('Payload of Clone--->', payload);
      }
      if (this.params.selectedItemId) {
        Object.assign(this.listOfBranchRecordForEdit, this.form.value);
        payload = this.listOfBranchRecordForEdit;

      }

      this.branchFacade.saveFormInput(payload)

      if (param == 'saveAndContinued') {
        console.log("param", param);
        this.form.reset();

        this.toastr.success('Record saved successfully!', 'Success')
      }
      else if (param == 'save') {
        console.log("param", param);
        this.toastr.success('Record saved successfully!', 'Success')

        this.router.navigate(['/branch/list']);

      }
    }
    else {
      this.form.markAllAsTouched();
      this.toastr.error('Please fill in all the required fields.', 'Error');

      if (this.formSaved) {
        this.clearInvalidToaster(); // Clear the invalid toaster if the form has been saved
      }
    }



  }





  // onSaveAndContinue() {



  //   if (this.form.valid) {
  //     console.log(this.form.value);
  //     this.toastr.success('Record saved successfully!', 'Success');

  //     this.form.reset(); // Reset the form after saving
  //     this.markControlsAsPristine(); // Mark all controls as pristine after reset
  //     this.formSaved = true; // Set the flag to true after successful save
  //   } else {
  //     this.toastr.error('Please fill in all the required fields.', 'Error');
  //     if (this.formSaved) {
  //       this.clearInvalidToaster(); // Clear the invalid toaster if the form has been saved
  //     }
  //   }

  // }

  clearInvalidToaster() {
    const toDateControl = this.form.get('toDate');
    if (toDateControl && toDateControl.invalid) {
      toDateControl.setErrors(null); // Remove the error state from the To Date control
    }
  }
  pastDateValidator(control: AbstractControl): ValidationErrors | null {
    const selectedDate = new Date(control.value);
    const currentDate = new Date();
    if (selectedDate > currentDate) {
      return { futureDate: true };
    }
    return null;
  }


  get f() {
    return this.form.controls;
  }


  onBack() {
    // Handle back button action

    console.log('Back button clicked');

    const dialogRef = this.dialog.open(BackdialogComponent, {
      width: '250px',
    });

    dialogRef.afterClosed().subscribe((result: boolean) => {
      if (result) {
        // this.toastr.warning('The Information may get lost! Please Save it First', 'Warning');
        this.router.navigate(['/branch/list']);
      }
    });
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






}






