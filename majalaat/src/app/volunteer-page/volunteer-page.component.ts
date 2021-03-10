import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { Volunteer, VOLUNTEER_GENDER } from '../volunteer/volunteer.class';

@Component({
  selector: 'app-volunteer-page',
  templateUrl: './volunteer-page.component.html',
  styleUrls: ['./volunteer-page.component.scss']
})
export class VolunteerPageComponent implements OnInit {

  volunteer;

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

    this.linkIcon = (this.volunteer.profileLink.includes('facebook') ? "fa-facebook" : "linked-in")

  }

  validateOperation(result: boolean): void {
    if (result) {
      this.showContactInfo = true;
    }
  }

}


