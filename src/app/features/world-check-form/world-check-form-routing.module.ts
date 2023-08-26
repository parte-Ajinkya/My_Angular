import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WorldCheckFormComponent } from './components/world-check-form/world-check-form.component';
const routes: Routes = [
  { path: 'world-check/form', component: WorldCheckFormComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WorldCheckFormRoutingModule { }
