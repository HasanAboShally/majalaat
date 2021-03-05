import { Component, OnInit } from '@angular/core';
import { BackendService } from '../backend.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  volunteers = [];

  constructor(private backend: BackendService) { }

  ngOnInit(): void {

    this.backend.getVolunteers().subscribe(volunteers => {
      this.volunteers = volunteers;
    });

  }

}
