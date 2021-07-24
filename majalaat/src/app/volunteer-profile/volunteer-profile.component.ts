import { Component, Inject, Injector, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActivatedRoute, Params } from '@angular/router';
import { Subject } from 'rxjs';
import { BackendService } from '../backend.service';
import { ConfirmDialogComponent, ConfirmDialogModel } from '../confirm-dialog/confirm-dialog.component';
import { UserService } from '../user.service';
import { Volunteer, VOLUNTEER_GENDER } from '../volunteer/volunteer.class';



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


  private dialogRef = null;

  constructor(private route: ActivatedRoute,
    public userService: UserService,
    private backend: BackendService,
    private injector: Injector,
    private dialog: MatDialog) {

    this.dialogRef = this.injector.get(MatDialogRef, null);
    let data = this.injector.get(MAT_DIALOG_DATA, null);

    this.volunteer = data;


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
      this.linkIcon = (this.volunteer.profileLink.includes('facebook') ? "fa-facebook" : "linked-in")
    }

    this.msgText = "سلام " + this.volunteer.name.first + "، وصلت إليك عن طريق موقع مجالات وأريد من فضلك أن أستشيرك بخصوص مجال دراستك وعملك. أرجو منك إخباري بالوقت المناسب للتواصل. شكرا جزيلا لك!";

  }

  // validateOperation(result: boolean): void {
  //   if (result) {
  //     this.showContactInfo = true;
  //   }
  // }


  contact() {

    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: new ConfirmDialogModel("تأكيد التواصل", "عزيزنا المستخدم، طاقم ومتطوّعوا مجالات هم هنا لمساعدتك. نرجو منك احترام وقتهم وعدم التواصل معهم لأجل أسئلة يمكن العثور على اجاباتها بسهولة عبر بحث بسيط في الانترنت (مثل معدّلات القبول مثلا). لراحتك يتم ادراج رسالة معدّة مسبقا عند ضغطك على كبسة التواصل، حيث يمكنك ارسالها مباشرة (لا تقلق، لا يتم ارسال الرسالة تلقائيا.) "),
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



}
