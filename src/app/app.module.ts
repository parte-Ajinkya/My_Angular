import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './core/auth/components/login/login.component';
import { SidenavComponent } from './core/auth/components/sidenav/sidenav.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BranchFormComponent } from './features/branch-details/components/branch-form/branch-form.component';
import { BranchListComponent } from './features/branch-details/components/branch-list/branch-list.component';
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
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { AngularSlickgridModule } from 'angular-slickgrid';
// import { BranchListComponent } from './branch-list/branch-list.component';
import { MatDateFormats } from '@angular/material/core';         
// import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import {CdkAccordionModule} from '@angular/cdk/accordion';
import {MatExpansionModule} from '@angular/material/expansion';
import { FormsModule } from '@angular/forms';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import { ApplicationFormComponent } from './features/application-details/components/application-form/application-form.component';
import {MatSelectModule} from '@angular/material/select';
import { HttpClientModule } from '@angular/common/http';
import { FileUploadComponent } from './shared/helpers/file-upload/file-upload.component';
// import { BranchFormComponent } from './features/branch-details/components/branch-form/branch-form.component';
// import {MatPaginatorModule} from '@angular/material/paginator';
// import { BranchListComponent } from './branch-list/branch-list.component';
import { VendorsComponent } from './features/vendor-details/components/vendors/vendors.component';
import { ToastrModule } from 'ngx-toastr';
import { NgSelectModule } from '@ng-select/ng-select';
import { DialogboxComponent } from 'src/app/shared/helpers/dialogbox/dialogbox.component';
import { BackdialogComponent } from './shared/helpers/backdialog/backdialog.component';
import { MatDialog } from '@angular/material/dialog';
import { MatTooltipModule } from '@angular/material/tooltip';
import { BranchDetailsModule } from './features/branch-details/branch-details.module';
import { VendorDetailsModule } from './features/vendor-details/vendor-details.module';
import {MatTabsModule} from '@angular/material/tabs';
import { WorldCheckModule } from './features/world-check/world-check.module';
import { WorldCheckComponent } from './features/world-check/components/world-check/world-check.component';
import { WorldCheckFormComponent } from './features/world-check-form/components/world-check-form/world-check-form.component';
import { WorldCheckFormModule } from './features/world-check-form/world-check-form.module';
@NgModule({
  schemas:[CUSTOM_ELEMENTS_SCHEMA],
  declarations: [
    AppComponent,
    LoginComponent,
    SidenavComponent,
    DialogboxComponent,
    // BranchListComponent,
    WorldCheckComponent,
    BranchListComponent,
    BranchFormComponent,
    BackdialogComponent,
    FileUploadComponent,
    ApplicationFormComponent ,
    VendorsComponent,
    WorldCheckFormComponent,

    // BranchListComponent,
    // RestComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
     AngularSlickgridModule.forRoot({}),
     MatNativeDateModule,
     MatToolbarModule,
     MatButtonModule,
     MatIconModule,
     ReactiveFormsModule,
     FormsModule ,
     MatInputModule ,
     MatTabsModule,
     WorldCheckModule,
     MatCardModule,
     MatDatepickerModule,
     MatRadioModule,
     MatFormFieldModule,
     MatCheckboxModule,
     MatTooltipModule,
     MatNativeDateModule,
     CdkAccordionModule,
 MatExpansionModule,
 MatButtonToggleModule,
 MatSlideToggleModule,
 MatSelectModule,
 HttpClientModule ,
 MatPaginatorModule,
 ToastrModule.forRoot(),
 NgSelectModule,
 MatDialogModule,
 BranchDetailsModule,
 VendorDetailsModule,
 WorldCheckFormModule
    
  ],
  exports :[
    AngularSlickgridModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
