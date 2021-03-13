import { Component } from '@angular/core';
import { ColorSchemeService } from '../shared/color-scheme.service';
import { BackendService } from './backend.service';
import { UserService } from './user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  themeColor: 'primary' | 'accent' | 'warn' = 'primary';
  isDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

  showSpinner = true;

  pages = [
    { title: "الرئيسيّة", path: "" },
    { title: "المتطوّعون", path: "volunteers" },
    { title: "عن مجالات", path: "about" },
  ]

  constructor(
    public userService: UserService,
    private backend: BackendService,
    private colorSchemeService: ColorSchemeService) { }

  ngOnInit(): void {
    this.colorSchemeService.load();

    this.backend.ready().subscribe(isReady => {

      if (!isReady) {
        return;
      }

      this.showSpinner = false;

    });


  }

  toggleTheme(): void {
    this.colorSchemeService.toggle();
  }

}
