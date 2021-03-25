import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { BackendService } from '../backend.service';
import { Volunteer, VOLUNTEER_GENDER, VOLUNTEER_STATUS } from '../volunteer/volunteer.class';

import { VolunteerProfileComponent } from '../volunteer-profile/volunteer-profile.component';
import { MatDialog } from '@angular/material/dialog';

import { Location } from '@angular/common';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush

})
export class HomeComponent implements OnInit {

  VOLUNTEER_GENDER = VOLUNTEER_GENDER;
  VOLUNTEER_STATUS = VOLUNTEER_STATUS;


  volunteers = [];
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

  searchText;

  constructor(private backend: BackendService, private cdr: ChangeDetectorRef, private dialog: MatDialog, private location: Location) {


  }

  ngOnInit(): void {

    this.volunteers = this.shuffle(this.backend.getVolunteers());
    this.fields = this.backend.getFields();
    this.institutes = this.backend.getInstitutes();
    this.towns = this.backend.getTowns();



  }


  shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {

      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;

      // And swap it with the current element.
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }

    return array;
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

  prevUrl

  showVolunteerDetails(volunteer: Volunteer) {

    this.prevUrl = this.location.path();
    this.location.replaceState("/volunteers/" + volunteer.id);

    const dialogRef = this.dialog.open(VolunteerProfileComponent, {
      data: volunteer,
      maxWidth: "80%"
    });



    dialogRef.afterClosed().subscribe(selectedCycleType => {


      this.location.replaceState(this.prevUrl);

    });

  }

}
