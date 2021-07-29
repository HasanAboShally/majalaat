import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from './about/about.component';
import { PrivacyPolicyComponent } from './about/privacy-policy/privacy-policy.component';
import { TermsOfUseComponent } from './about/terms-of-use/terms-of-use.component';
import { DataResolver } from './data.resolver';
import { HomeComponent } from './home/home.component';
import { UsefulLinksPageComponent } from './useful-links-page/useful-links-page.component';
import { VolunteerProfileComponent } from './volunteer-profile/volunteer-profile.component';
import { VolunteersComponent } from './volunteers/volunteers.component';




const routes: Routes = [
  {
    path: '', resolve: { users: DataResolver }, children: [

      { path: '', component: HomeComponent },
      { path: 'links', component: UsefulLinksPageComponent },
      { path: 'links/:categoryName', component: UsefulLinksPageComponent },
      { path: 'volunteers', component: VolunteersComponent },
      { path: 'volunteers/:volunteerId', component: VolunteerProfileComponent },
      { path: 'about', component: AboutComponent },
      { path: 'about/privacy-policy', component: PrivacyPolicyComponent },
      { path: 'about/terms-of-use', component: TermsOfUseComponent },
      { path: 'useful-links', redirectTo: '/links', pathMatch: 'full' },
      { path: '**', redirectTo: '/', pathMatch: 'full' },

    ]
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
