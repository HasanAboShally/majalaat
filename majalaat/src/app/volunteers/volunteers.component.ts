import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { BackendService } from '../backend.service';
import { Volunteer, VOLUNTEER_GENDER, VOLUNTEER_STATUS } from '../volunteer/volunteer.class';

import { VolunteerProfileComponent } from '../volunteer-profile/volunteer-profile.component';
import { MatDialog } from '@angular/material/dialog';

import { Location } from '@angular/common';
import { FiltersDialogComponent } from '../filters-dialog/filters-dialog.component';

@Component({
  selector: 'app-volunteers',
  templateUrl: './volunteers.component.html',
  styleUrls: ['./volunteers.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush

})
export class VolunteersComponent implements OnInit {

  volunteers = [];

  searchText;

  filterArgs = {
    fields: [],
    institutes: [],
    towns: [],
    gender: [],
    status: []
  };

  appliedFiltersCount = 0;

  constructor(private backend: BackendService, private cdr: ChangeDetectorRef, private dialog: MatDialog, private location: Location) {

  }

  ngOnInit(): void {
    this.volunteers = this.shuffle(this.backend.getVolunteers());
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

  showFilteringDialog(){
    
    const dialogRef = this.dialog.open(FiltersDialogComponent, {
      maxWidth: "90%",
      data:this.filterArgs
    });

    dialogRef.afterClosed().subscribe(filterArgs => {

      if(!filterArgs){
        return;
      }

      this.filterArgs = filterArgs;
      
      this.appliedFiltersCount =
          this.filterArgs.fields.length + 
          this.filterArgs.gender.length + 
          this.filterArgs.institutes.length + 
          this.filterArgs.status.length + 
          this.filterArgs.towns.length;

      
      this.cdr.detectChanges();


    });
  }

}
