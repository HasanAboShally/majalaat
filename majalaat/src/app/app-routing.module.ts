import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from './about/about.component';
import { HomeComponent } from './home/home.component';
import { VolunteerProfileComponent } from './volunteer-profile/volunteer-profile.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'volunteer/:volunteerId', component: VolunteerProfileComponent },
  { path: 'about', component: AboutComponent },
  { path: '**', redirectTo: '/', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
