import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Subject } from 'rxjs';
import { BackendService } from '../backend.service';
import { UserService } from '../user.service';
import { VOLUNTEER_GENDER } from '../volunteer/volunteer.class';

@Component({
  selector: 'app-volunteer-profile',
  templateUrl: './volunteer-profile.component.html',
  styleUrls: ['./volunteer-profile.component.scss']
})
export class VolunteerProfileComponent implements OnInit {

  volunteer;

  generateCode: Subject<any> = new Subject<any>();

  isExpanded = false;
  showContactInfo = false;
  showValidation = false;

  genderIcon;
  linkIcon;

  constructor(private route: ActivatedRoute,
    public userService: UserService,
    private backend: BackendService) { }

  ngOnInit() {



    this.route.params.subscribe(
      (params: Params): void => {

        const volunteerId = params.volunteerId;

        this.volunteer = this.backend.getVolunteer(volunteerId);

        this.genderIcon = (this.volunteer.gender == VOLUNTEER_GENDER.FEMALE ? "fa-female" : "fa-male")
        this.linkIcon = (this.volunteer.profileLink.includes('facebook') ? "fa-facebook" : "linked-in")


      });

  }

  validateOperation(result: boolean): void {
    if (result) {
      this.showContactInfo = true;
    }
  }


  contact() {

    if (!this.userService.canContact) {
      return;
    }

    this.userService.consumeContactCredit();

    this.showValidation = true;
  }



}
