import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgSelectModule } from '@ng-select/ng-select';
import { BranchDetailsRoutingModule } from './branch-details-routing.module';
import { BranchFormComponent } from './components/branch-form/branch-form.component';
import {MatButtonModule} from '@angular/material/button';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {MatCardModule} from '@angular/material/card';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatDialogModule} from '@angular/material/dialog';
import {MatDividerModule} from '@angular/material/divider';
import {MatDatepickerModule} from '@angular/material/datepicker';
// import { MatNativeDateModule } from '@angular/material/core';
import {MatCommonModule} from '@angular/material/core';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {MatMenuModule} from '@angular/material/menu';
import {MatRadioModule} from '@angular/material/radio';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatRippleModule} from '@angular/material/core';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatSortModule} from '@angular/material/sort';
import {MatSliderModule} from '@angular/material/slider';
import {MatSidenavModule} from '@angular/material/sidenav';
import { ReactiveFormsModule } from '@angular/forms';
import { MatNativeDateModule } from '@angular/material/core';
import {CdkAccordionModule} from '@angular/cdk/accordion';
import {MatExpansionModule} from '@angular/material/expansion';
import { FormsModule } from '@angular/forms';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import { BranchListComponent } from './components/branch-list/branch-list.component';
import { AngularSlickgridModule } from 'angular-slickgrid';
import { AngularGridInstance, FieldType ,AutoResizeOption } from 'angular-slickgrid';
import { HttpClientModule } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';
import { DialogboxComponent } from 'src/app/shared/helpers/dialogbox/dialogbox.component';
console.warn("branch-details loaded");
// import {MatPaginatorModule} from '@angular/material/paginator';
@NgModule({
  declarations: [
  
   
   
  ],
  imports: [
    CommonModule,
    BranchDetailsRoutingModule,
    MatNativeDateModule,
     MatToolbarModule,
     MatButtonModule,
     MatIconModule,
     ReactiveFormsModule,
     FormsModule ,
     MatInputModule ,
     MatCommonModule,
     MatCardModule,
     MatDatepickerModule,
     MatRadioModule,
     MatFormFieldModule,
     MatCheckboxModule,
     MatNativeDateModule,
     CdkAccordionModule,
 MatExpansionModule,
 MatButtonToggleModule,
 MatSlideToggleModule,
 AngularSlickgridModule.forRoot({}),
 HttpClientModule ,
 MatPaginatorModule,
 NgSelectModule,
 MatDialogModule,
 ToastrModule.forRoot({
  // ToastrModule configurations (if any)
}),
  ],
  exports :[
    AngularSlickgridModule
  ]
})
export class BranchDetailsModule { }
