import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from '@guards/auth.guard';

import { BorrowListComponent } from './borrow-list/borrow-list.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: BorrowListComponent,
    canActivate: [AuthGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BorrowRoutingModule {}
