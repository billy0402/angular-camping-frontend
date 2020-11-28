import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FaqRoutingModule } from './faq-routing.module';
import { FaqCreateDialogComponent } from './faq-create-dialog/faq-create-dialog.component';
import { FaqListComponent } from './faq-list/faq-list.component';


@NgModule({
  declarations: [FaqCreateDialogComponent, FaqListComponent],
  imports: [
    CommonModule,
    FaqRoutingModule
  ]
})
export class FaqModule { }
