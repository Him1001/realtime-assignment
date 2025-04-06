import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './component/home/home.component';
import { AddEmployeeComponent } from './component/add-employee/add-employee.component';

const routes: Routes = [
  {
    path: '', component: HomeComponent
  },
  {
    path: 'add-employee',
    component: AddEmployeeComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }