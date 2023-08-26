import { Component, OnInit,Inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
@Component({
  selector: 'app-dialogbox',
  templateUrl: './dialogbox.component.html',
  styleUrls: ['./dialogbox.component.css'],
})
export class DialogboxComponent implements OnInit {
  action: any;
  local_data: any;

  constructor(
    public dialogRef: MatDialogRef<DialogboxComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit(): void {
  }
  open() {
    throw new Error('Method not implemented.');
  }
  onYesClick(): void {
    this.dialogRef.close(true); // User clicked on 'Yes', pass true to indicate confirmation
  }

  onNoClick(): void {
    this.dialogRef.close(false); // User clicked on 'No', pass false to indicate cancellation
  }

  // onYesClick(){
  //   this.dialogRef.close({event:this.action,data:this.local_data});
  // }

  // onNoClick(){ 
  //   this.dialogRef.close({event:'Cancel'});
  // }


}
