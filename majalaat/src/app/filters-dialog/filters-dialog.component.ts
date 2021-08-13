import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { BackendService } from '../backend.service';
import { VOLUNTEER_GENDER, VOLUNTEER_STATUS } from '../volunteer/volunteer.class';

@Component({
  selector: 'app-filters-dialog',
  templateUrl: './filters-dialog.component.html',
  styleUrls: ['./filters-dialog.component.scss']
})
export class FiltersDialogComponent implements OnInit {
 
  VOLUNTEER_GENDER = VOLUNTEER_GENDER;
  VOLUNTEER_STATUS = VOLUNTEER_STATUS;

  title: string;
  message: string;

  fields = [];
  institutes = [];
  towns = [];

  filterArgs = {
    fields: [],
    institutes: [],
    towns: [],
    gender: [],
    status: []
  };


  constructor(public dialogRef: MatDialogRef<FiltersDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data,
    private backend: BackendService) {
    // Update view with given values

    this.filterArgs  = this.data;
  }

  ngOnInit(): void {

    this.fields = this.backend.getFields();
    this.institutes = this.backend.getInstitutes();
    this.towns = this.backend.getTowns();

  }

  toggleFilter(arg, value) {

    let index = this.filterArgs[arg].indexOf(value);

    if (index === -1) {
      this.filterArgs[arg].push(value);
    } else {
      this.filterArgs[arg].splice(index, 1);
    }
    // this.cdr.detectChanges();

  }

  onConfirm(): void {
    // Close the dialog, return true
    this.dialogRef.close(this.filterArgs);
  }

  onDismiss(): void {
    // Close the dialog, return false
    this.dialogRef.close(false);
  }
}
