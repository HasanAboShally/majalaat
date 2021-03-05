import { Component, Input, OnInit } from '@angular/core';
import { Volunteer } from './volunteer.class';

@Component({
  selector: 'app-volunteer',
  templateUrl: './volunteer.component.html',
  styleUrls: ['./volunteer.component.scss']
})
export class VolunteerComponent implements OnInit {

  @Input() volunteer: Volunteer;

  constructor() { }

  ngOnInit(): void {
  }

}
