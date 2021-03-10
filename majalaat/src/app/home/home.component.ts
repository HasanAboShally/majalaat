import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { BackendService } from '../backend.service';



@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  volunteers = [];
  fields = [];
  institutes = [];
  towns = [];

  filterArgs = {
    fields: [],
    institutes: [],
    towns: [],
    gender: []
  };

  constructor(private backend: BackendService, private cdr: ChangeDetectorRef) { }

  ngOnInit(): void {

    this.backend.ready.subscribe(isReady => {

      if (!isReady) {
        return;
      }

      this.volunteers = this.backend.getVolunteers();
      this.fields = this.backend.getFields();
      this.institutes = this.backend.getInstitutes();
      this.towns = this.backend.getTowns();
    });

  }

  toggleFilter(arg, value) {

    let arr = this.filterArgs[arg];

    let index = arr.indexOf(value);

    if (index === -1) {
      arr.push(value);
    } else {
      arr.splice(index, 1);
    }

    this.cdr.detectChanges();

  }

}
