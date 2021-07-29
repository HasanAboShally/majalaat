import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { BackendService } from '../backend.service';

@Component({
  selector: 'app-useful-links-page',
  templateUrl: './useful-links-page.component.html',
  styleUrls: ['./useful-links-page.component.scss']
})
export class UsefulLinksPageComponent implements OnInit {

  links;

  constructor(private backend: BackendService, private route: ActivatedRoute) { }

  ngOnInit(): void {

    this.links = this.backend.getUsefulLinks();

    setTimeout(() => {
      this.route.params.subscribe(
        (params: Params): void => {

          if (!params.categoryName) {
            return;
          }

          let elm = document.getElementById("cat-" + params.categoryName.replace("-", " "));

          if (elm) {
            elm.scrollIntoView();
          }

        });
    });



  }

}
