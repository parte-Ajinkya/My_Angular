import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BranchFormComponent } from './components/branch-form/branch-form.component';
import { BranchListComponent } from './components/branch-list/branch-list.component';

const routes: Routes = [

  { path: 'branch/form', component: BranchFormComponent },
  { path: 'branch/list', component: BranchListComponent },


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BranchDetailsRoutingModule { }
