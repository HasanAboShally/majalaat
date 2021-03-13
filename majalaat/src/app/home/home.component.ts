import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { BackendService } from '../backend.service';
import { VOLUNTEER_GENDER, VOLUNTEER_STATUS } from '../volunteer/volunteer.class';



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

  constructor(private backend: BackendService, private cdr: ChangeDetectorRef) {


  }

  ngOnInit(): void {

    this.volunteers = this.backend.getVolunteers();
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

}
