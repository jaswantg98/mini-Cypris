import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-search-error-dialog',
  templateUrl: './search-error-dialog.component.html',
  styleUrls: ['./search-error-dialog.component.css']
})
export class SearchErrorDialogComponent {
  constructor(
    private dialogRef: MatDialogRef<SearchErrorDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { message: string }
  ) {}

  close() {
    this.dialogRef.close();
  }
}
