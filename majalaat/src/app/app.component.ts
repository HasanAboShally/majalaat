import { Component } from '@angular/core';
import { ColorSchemeService } from '../shared/color-scheme.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  themeColor: 'primary' | 'accent' | 'warn' = 'primary';
  isDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

  pages = [
    { title: "الرئيسيّة", path: "" },
    { title: "المتطوّعون", path: "volunteers" },
    { title: "عن مجالات", path: "about" },
  ]

  constructor(private colorSchemeService: ColorSchemeService) { }

  ngOnInit(): void {
    this.colorSchemeService.load();
  }

  toggleTheme(): void {
    this.colorSchemeService.toggle();
  }

}
