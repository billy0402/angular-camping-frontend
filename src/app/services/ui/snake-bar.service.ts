import { Injectable } from '@angular/core';

import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class SnakeBarService {
  constructor(private snackBar: MatSnackBar) {}

  open(message: string): void {
    this.snackBar.open(message, '關閉', {
      duration: 3000,
    });
  }
}
