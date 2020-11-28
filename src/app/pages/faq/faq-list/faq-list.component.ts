import { Component, OnInit } from '@angular/core';

import { MatDialog } from '@angular/material/dialog';

import { FaqCreateDialogComponent } from '@pages/faq/faq-create-dialog/faq-create-dialog.component';

import { faqs } from '../../../fixtures/faq.fixture';

@Component({
  selector: 'app-faq-list',
  templateUrl: './faq-list.component.html',
  styleUrls: ['./faq-list.component.scss'],
})
export class FaqListComponent implements OnInit {
  faqs = faqs;

  constructor(private dialog: MatDialog) {}

  ngOnInit(): void {}

  openDialog(): void {
    this.dialog.open(FaqCreateDialogComponent, {
      width: '70%',
    });
  }
}
