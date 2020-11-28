import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { FaqListComponent } from './faq-list/faq-list.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', component: FaqListComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FaqRoutingModule {}
