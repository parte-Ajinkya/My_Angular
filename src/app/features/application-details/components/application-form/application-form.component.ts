import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators,FormArray, FormControl } from '@angular/forms';
@Component({
  selector: 'app-application-form',
  templateUrl: './application-form.component.html',
  styleUrls: ['./application-form.component.css']
})
export class ApplicationFormComponent implements OnInit {


  isChecked = true;

  form!: FormGroup;
  

  constructor(private fb: FormBuilder ) {
    
   }



  ngOnInit() {
    this.form = this.fb.group({
      generalInfo: this.fb.group({
     
        branchName: ['', Validators.required],
        branchCode: ['', Validators.required],
        parentBranch: [''],
        customerID: ['', Validators.required],
        allowedUsers: ['', Validators.required],
        description: [''],
        target: ['', Validators.required],
        isRestricted: [''],
        isExcluded: [''],
        fromDate: ['', Validators.required],
        toDate: ['', Validators.required],
        anchorTag: [false],
        sequence: [''],
        status: [false] 
      }),
      addressInfo: this.fb.group({
        street: ['', Validators.required],
        city: ['', Validators.required],
        state: ['', Validators.required],
        zipCode: ['', [Validators.required, Validators.pattern('[0-9]{5}')]],
      }),
      contactInfo: this.fb.group({
        email: ['', [Validators.required, Validators.email]],
        phone: ['', Validators.required],
        // contactNumber:['',Validators.required,this.fb.array([])],
        // contactType:['',Validators.required,this.fb.array([])],
        contactNumber: new FormArray([])
        
      }),
      gstInfo: this.fb.group({
        gstNumber: ['', Validators.required],
      })
    });

  
  }

  get contactNumberControls()
  {
    return (<FormArray>this.form.get('contactNumber')).controls;
  }

  get contactTypeFormArray() {
    return this.form.get('contactInfo.contactType') as FormArray;
  }

  // Getter for contactDetails FormArray
  get contactDetailsFormArray() {
    return this.form.get('contactInfo.contactDetails') as FormArray;
  }


  addContactNumber() {
    // this.contactTypeFormArray.push(this.fb.control(''));
    const control = new FormControl(null,[Validators.required]);
    (<FormArray>this.form.get('contactNumber'))?.push(control)
  }

  // Function to remove contactType field dynamically 
  removeContactType(index: number) {
    this.contactTypeFormArray.removeAt(index);
  }


  

  onSave() {
    if (this.form.valid) {
      console.log('Form data:', this.form.value);
    } else {
      console.log('Invalid form');
      // Handle form validation errors
    }
  }



  onBack() {
    // Handle back button action
  }

  onSaveAndContinue() {
    if (this.form.valid) {
      console.log('Form data:', this.form.value);
      // Save data and navigate to the next step
    } else {
      console.log('Invalid form');
      // Handle form validation errors
    }
  }
  

}
