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
    { title: "روابط مفيدة", path: "useful-links" },
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

  showCreditExplaining() {
    alert("عزيزنا المستخدم، تقديرا منّا لوقت متطوّعينا وحفاظا على استمراريّة قدرتهم على العطاء فإنّنا نقوم بتحديد عدد المتطوّعين الذين يستطيع كل مستخدم التواصل معهم. الرقم الظاهر هنا هو لعدد التواصلات المتبقّية لديك، في كل مرّة تضغط على كبسة التواصل مع أحد المتطوّعين يقل هذا الرقم.");
  }

}
