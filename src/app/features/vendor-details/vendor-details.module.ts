import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VendorDetailsRoutingModule } from './vendor-details-routing.module';
import { VendorsComponent } from './components/vendors/vendors.component';


@NgModule({
  declarations: [
 
  ],
  imports: [
    CommonModule,
    VendorDetailsRoutingModule
  ]
})
export class VendorDetailsModule { }
