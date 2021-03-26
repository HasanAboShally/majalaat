import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Subject } from 'rxjs';
import { Volunteer, VOLUNTEER_GENDER } from './volunteer.class';

@Component({
  selector: 'app-volunteer',
  templateUrl: './volunteer.component.html',
  styleUrls: ['./volunteer.component.scss']
})
export class VolunteerComponent implements OnInit {

  @Input() volunteer: Volunteer;

  generateCode: Subject<any> = new Subject<any>();

  isExpanded = false;
  showContactInfo = false;
  showValidation = false;

  genderIcon;
  linkIcon;

  constructor() {
  }

  ngOnInit(): void {
    this.genderIcon = (this.volunteer.gender == VOLUNTEER_GENDER.FEMALE ? "fa-female" : "fa-male")

    if (this.volunteer.profileLink) {
      this.linkIcon = (this.volunteer.profileLink.includes('facebook') ? "fa-facebook" : "linked-in")
    }

  }

  validateOperation(result: boolean): void {
    if (result) {
      this.showContactInfo = true;
    }
  }

}
