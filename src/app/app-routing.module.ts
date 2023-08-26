import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BranchListComponent } from './features/branch-details/components/branch-list/branch-list.component';
import { BranchFormComponent } from './features/branch-details/components/branch-form/branch-form.component';
import { VendorsComponent } from './features/vendor-details/components/vendors/vendors.component';
import { WorldCheckComponent } from './features/world-check/components/world-check/world-check.component';
const routes: Routes = [
  
    
  // { path: 'branch/list', component: BranchListComponent },
  // {path:'branch/form',component:BranchFormComponent},
    // {
    //   path:'branch',component:BranchListComponent  },
    {path:'world-check-form' ,loadChildren:()=>import('./features/world-check-form/world-check-form.module').then(mod=>mod.WorldCheckFormModule)},
    {path:'world-check' ,loadChildren:()=>import('./features/world-check/world-check.module').then(mod=>mod.WorldCheckModule)},
    {path:'vendor-module' ,loadChildren:()=>import('./features/vendor-details/vendor-details.module').then(mod=>mod.VendorDetailsModule)},
    { path: 'branch-module', loadChildren: () => import('./features/branch-details/branch-details.module').then(mod=>mod.BranchDetailsModule) },
    // { path: 'branch-module', loadChildren: () => import('./features/branch-details/components/branch-list/branch-list.component').then(m =>m.BranchListComponent) },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
