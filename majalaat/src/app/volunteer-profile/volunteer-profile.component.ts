import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { BackendService } from '../backend.service';
import { VOLUNTEER_GENDER } from '../volunteer/volunteer.class';

@Component({
  selector: 'app-volunteer-profile',
  templateUrl: './volunteer-profile.component.html',
  styleUrls: ['./volunteer-profile.component.scss']
})
export class VolunteerProfileComponent implements OnInit {

  volunteer;
  genderIcon;
  showValidation;
  showContactInfo;

  constructor(private route: ActivatedRoute,
    private backend: BackendService) { }

  ngOnInit() {

    this.genderIcon = (this.volunteer.gender == VOLUNTEER_GENDER.FEMALE ? "fa-female" : "fa-male")

    this.route.params.subscribe(
      (params: Params): void => {

        const volunteerId = params.volunteerId;

        this.volunteer = this.backend.getVolunteer(volunteerId);

      });

  }


}
