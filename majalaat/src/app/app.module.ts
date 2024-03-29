import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { environment } from '../environments/environment';

import { MaterialModule } from 'src/shared/angular-material';
import { FlexLayoutModule } from '@angular/flex-layout';
// import { RecaptchaModule } from "ng-recaptcha";
import { NgxGoogleAnalyticsModule, NgxGoogleAnalyticsRouterModule } from 'ngx-google-analytics';
import firebase from 'firebase/app';
import 'firebase/analytics';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { VolunteerComponent } from './volunteer/volunteer.component';


// import { ValidationComponent } from 'src/shared/validation/validation.component';
import { HumanValidationComponent } from './human-validation/human-validation.component';
import { FormsModule } from '@angular/forms';
import { VolunteerProfileComponent } from './volunteer-profile/volunteer-profile.component';
import { VolunteerFilterPipe } from './volunteer/volunteer.pipe';
import { MaterialsPageComponent } from './materials-page/materials-page.component';
import { ConfirmDialogComponent } from './confirm-dialog/confirm-dialog.component';

import { MarkdownModule } from 'ngx-markdown';
import { TermsOfUseComponent } from './about/terms-of-use/terms-of-use.component';
import { PrivacyPolicyComponent } from './about/privacy-policy/privacy-policy.component';


import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { UsefulLinkComponent } from './useful-link/useful-link.component';
import { UsefulLinksPageComponent } from './useful-links-page/useful-links-page.component';
import { VolunteersComponent } from './volunteers/volunteers.component';
import { FiltersDialogComponent } from './filters-dialog/filters-dialog.component';
import { PartnerDialogComponent } from './partner-dialog/partner-dialog.component';
import { VolunteerContactComponent } from './volunteer-contact/volunteer-contact.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AboutComponent,
    VolunteerComponent,
    HumanValidationComponent,
    VolunteerProfileComponent,
    VolunteerFilterPipe,
    MaterialsPageComponent,
    ConfirmDialogComponent,
    TermsOfUseComponent,
    PrivacyPolicyComponent,
    UsefulLinkComponent,
    UsefulLinksPageComponent,
    VolunteersComponent,
    FiltersDialogComponent,
    PartnerDialogComponent,
    VolunteerContactComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MaterialModule,
    FlexLayoutModule,
    FormsModule,
    MarkdownModule.forRoot(),
    // RecaptchaModule
    Ng2SearchPipeModule,
    NgxGoogleAnalyticsModule.forRoot(environment.firebaseConfig.measurementId),
    NgxGoogleAnalyticsRouterModule.forRoot(),
  ],
  providers: [],
  bootstrap: [AppComponent]
})

export class AppModule {
  constructor() {
    if (environment.production) {
      firebase.initializeApp(environment.firebaseConfig);
      firebase.analytics();
    }
  }
}
