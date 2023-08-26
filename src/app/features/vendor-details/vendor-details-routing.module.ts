import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VendorsComponent } from './components/vendors/vendors.component';
const routes: Routes = [

  { path: 'vendor/form', component: VendorsComponent },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VendorDetailsRoutingModule { }
