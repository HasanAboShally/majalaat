import { Component, Inject, Injector, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActivatedRoute, Params } from '@angular/router';
import { Subject } from 'rxjs';
import { BackendService } from '../backend.service';
import { ConfirmDialogComponent, ConfirmDialogModel } from '../confirm-dialog/confirm-dialog.component';
import { UserService } from '../user.service';
import { VolunteerContactComponent } from '../volunteer-contact/volunteer-contact.component';
import { Volunteer, VOLUNTEER_CONTACT_CHANNEL, VOLUNTEER_GENDER } from '../volunteer/volunteer.class';


@Component({
  selector: 'app-volunteer-profile',
  templateUrl: './volunteer-profile.component.html',
  styleUrls: ['./volunteer-profile.component.scss']
})
export class VolunteerProfileComponent implements OnInit {

  volunteer: Volunteer;

  generateCode: Subject<any> = new Subject<any>();

  isExpanded = false;
  showContactInfo = false;
  showValidation = false;

  genderIcon;
  linkIcon;

  msgText;

  VOLUNTEER_CONTACT_CHANNEL = VOLUNTEER_CONTACT_CHANNEL;

  isFavorite;

  isDialog = false;


  private dialogRef = null;

  constructor(private route: ActivatedRoute,
    public userService: UserService,
    private backend: BackendService,
    private injector: Injector,
    private dialog: MatDialog) {

    this.dialogRef = this.injector.get(MatDialogRef, null);
    let data = this.injector.get(MAT_DIALOG_DATA, null);

    this.volunteer = data;

    this.isDialog = (this.dialogRef != null);


  }


  ngOnInit() {


    if (this.volunteer) {
      this.loadVolunteer();
      return;
    }

    if (!this.volunteer) {

      this.route.params.subscribe((params: Params): void => {
        this.volunteer = this.backend.getVolunteer(params.volunteerId);
        this.loadVolunteer();
      });

    }
  }

  loadVolunteer() {
    this.genderIcon = (this.volunteer.gender == VOLUNTEER_GENDER.FEMALE ? "fa-female" : "fa-male")

    if (this.volunteer.profileLink) {
      this.linkIcon = (this.volunteer.profileLink.includes('facebook') ? "fa-facebook" : "fa-linkedin")
    }

    this.isFavorite = this.userService.isFavorite(this.volunteer.id);



  }

  // validateOperation(result: boolean): void {
  //   if (result) {
  //     this.showContactInfo = true;
  //   }
  // }


  contact() {

    const dialogRef = this.dialog.open(VolunteerContactComponent, {
      data: this.volunteer,
      maxWidth: "80%"
    });

    dialogRef.afterClosed().subscribe(dialogResult => {

      if (dialogResult) {

        if (!this.userService.canContact) {
          return;
        }

        this.userService.consumeContactCredit();
        this.showContactInfo = true;

      }

    });




  }


  toggleFavorite() {

    this.isFavorite = !this.isFavorite;

    if (this.isFavorite) {
      this.userService.addFavorite(this.volunteer.id);
    }
    else {
      this.userService.removeFavorite(this.volunteer.id);
    }


  }



}
