import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-partner-dialog',
  templateUrl: './partner-dialog.component.html',
  styleUrls: ['./partner-dialog.component.scss']
})
export class PartnerDialogComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<PartnerDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public partner) {

  }

  ngOnInit() {
  }

  onConfirm(): void {
    this.dialogRef.close(true);
  }

  onDismiss(): void {
    this.dialogRef.close(false);
  }
}