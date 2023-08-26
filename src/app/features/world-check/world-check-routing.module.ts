import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WorldCheckComponent } from './components/world-check/world-check.component';
const routes: Routes = [
  { path: 'world-check/form', component: WorldCheckComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WorldCheckRoutingModule { }
