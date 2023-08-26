import { Component, OnInit } from '@angular/core';
import { createInjectableType } from '@angular/compiler';

import { Inject, InjectionToken } from '@angular/core';

import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
@Component({
  selector: 'app-backdialog',
  templateUrl: './backdialog.component.html',
  styleUrls: ['./backdialog.component.css']
})
export class BackdialogComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<BackdialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
  }

  open() {
    throw new Error('Method not implemented.');
  }


  onYesClick(): void {
    this.dialogRef.close(true); // Emit the 'true' value when the 'Yes' button is clicked
  }
  
  onNoClick(): void {
    this.dialogRef.close(false); // Emit the 'false' value when the 'No' button is clicked
  }

}
