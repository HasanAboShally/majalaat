import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { VOLUNTEER_CONTACT_CHANNEL } from '../volunteer/volunteer.class';

@Component({
  selector: 'app-volunteer-contact',
  templateUrl: './volunteer-contact.component.html',
  styleUrls: ['./volunteer-contact.component.scss']
})
export class VolunteerContactComponent implements OnInit {

  volunteer;
  msgText;
  VOLUNTEER_CONTACT_CHANNEL = VOLUNTEER_CONTACT_CHANNEL;

  constructor(public dialogRef: MatDialogRef<VolunteerContactComponent>,
    @Inject(MAT_DIALOG_DATA) public data) {
    this.volunteer = data;
    this.msgText = "سلام " + this.volunteer.name.first + "، وصلت إليك عن طريق موقع مجالات وأريد من فضلك أن أستشيرك بخصوص مجال دراستك وعملك. أرجو منك إخباري بالوقت المناسب للتواصل. شكرا جزيلا لك!";

  }

  ngOnInit(): void {
  }

  onConfirm(): void {
    // Close the dialog, return true
    this.dialogRef.close();
  }

}