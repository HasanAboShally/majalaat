import { Component, Input, OnInit } from '@angular/core';
import { UsefulLink } from './useful-link.class';

@Component({
  selector: 'app-useful-link',
  templateUrl: './useful-link.component.html',
  styleUrls: ['./useful-link.component.scss']
})
export class UsefulLinkComponent implements OnInit {

  @Input() link: UsefulLink;

  constructor() { }

  ngOnInit(): void {
  }

}
