import { Component, OnInit } from '@angular/core';
import { BackendService } from '../backend.service';

@Component({
  selector: 'app-useful-links-page',
  templateUrl: './useful-links-page.component.html',
  styleUrls: ['./useful-links-page.component.scss']
})
export class UsefulLinksPageComponent implements OnInit {

  links;

  constructor(private backend: BackendService) { }

  ngOnInit(): void {

    this.links = this.backend.getUsefulLinks();
  }

}
