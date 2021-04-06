import { Injectable } from '@angular/core';
import { GoogleSheetsService } from '../shared/google-sheets.service';
import { environment } from '../environments/environment';
import { Volunteer, VolunteerName, VOLUNTEER_GENDER, VOLUNTEER_STATUS } from './volunteer/volunteer.class';
import { map } from 'rxjs/operators';
import { BehaviorSubject, forkJoin, Observable, Subject } from 'rxjs';
import { UsefulLink, UsefulLinksGroup } from './useful-link/useful-link.class';


@Injectable({
  providedIn: 'root'
})
export class BackendService {

  private _volunteers;
  private _fields;
  private _institutes;
  private _towns;

  private _usefulLinks;
  private _usefulLinksCategories;


  private _ready = new Subject();

  ready() {
    return this._ready.asObservable();
  }

  constructor(private gsx: GoogleSheetsService) {


    // this._loadVolunteers();
    this._loadData();

  }

  private _loadData() {

    const googleSheetId = environment.backend.googleSheet.id;
    const volunteersSheetIndex = environment.backend.googleSheet.sheets.volunteers.index;
    const usefulLinksSheetIndex = environment.backend.googleSheet.sheets.usefulLinks.index;


    let volunteers$ = this.gsx.getTable(googleSheetId, volunteersSheetIndex);
    let usefulLinks$ = this.gsx.getTable(googleSheetId, usefulLinksSheetIndex);


    forkJoin([volunteers$, usefulLinks$]).pipe(map(([volunteersTable, usefulLinksTable]) => {

      volunteersTable.rows.shift(); // remove headers row

      volunteersTable.columns['field'].shift();
      volunteersTable.columns['institute'].shift();
      volunteersTable.columns['town'].shift();

      this._volunteers = this._extractVolunteers(volunteersTable.rows);

      this._fields = [...new Set(volunteersTable.columns['field'])]; // keep only unique values
      this._institutes = [...new Set(volunteersTable.columns['institute'])];
      this._towns = [...new Set(volunteersTable.columns['town'])];

      usefulLinksTable.rows.shift(); // remove headers row
      usefulLinksTable.columns['category'].shift();
      this._usefulLinksCategories = [...new Set(usefulLinksTable.columns['category'])];

      this._usefulLinks = this._extractUsefulLinks(usefulLinksTable.rows);

      this._ready.next(true);

    })).subscribe();




  }

  private _extractVolunteers(rows) {

    let volunteers = {};

    rows.forEach(row => {

      let v = this._volunteerFromRow(row);

      if (v.isShow) {
        volunteers[v.id] = v;
      }
    });

    return volunteers

  }


  private _extractUsefulLinks(rows) {

    let links: UsefulLinksGroup[] = [];

    let categoryIndexes = {};

    this._usefulLinksCategories.forEach((category, index) => {
      categoryIndexes[category] = index;
      links.push(new UsefulLinksGroup({ title: category }));
    });

    rows.forEach(row => {

      // if (!links[row.category]) {
      //   links[row.category] = [];
      // }

      if (row.approved != "نعم") {
        return
      }

      links[categoryIndexes[row.category]].addLink(new UsefulLink(row));
    });

    return links

  }

  private _volunteerFromRow(row): Volunteer {

    function _extractGender(row) {
      return (row.gender === "أنثى" ? VOLUNTEER_GENDER.FEMALE : VOLUNTEER_GENDER.MALE);
    }

    function _extractIsShown(row) {
      return (row.isshow === "نعم") && (row.approved == "نعم");
    }

    function _extractStatus(row) {

      const currentYear = (new Date()).getFullYear();

      if (currentYear <= row.graduationyear) {
        return VOLUNTEER_STATUS.STUDENT;
      }

      if (currentYear <= (row.graduationyear + 2)) {
        return VOLUNTEER_STATUS.RECENT_GRADUATE;
      }


      return VOLUNTEER_STATUS.GRADUATE

    }

    return new Volunteer({
      id: row.volunteerid,
      joined: new Date(row.timestamp),
      email: row.email,
      name: new VolunteerName(row.firstname, row.lastname),
      gender: _extractGender(row),
      town: row.town,
      bio: row.bio,
      phone: row.phone,
      profileLink: row.profilelink,
      institute: row.institute,
      field: row.field,
      photoURL: GoogleSheetsService.getFileDirectURL(row.photourl),
      graduationYear: row.graduationyear,
      status: _extractStatus(row),
      isShow: _extractIsShown(row)
    });
  }

  getVolunteers() {
    return Object.values(this._volunteers);
  }

  getVolunteer(id) {

    if (!this._volunteers) {
      return {};
    }

    return this._volunteers[id];
  }

  getFields() {
    return this._fields;
  }

  getInstitutes() {
    return this._institutes;
  }

  getTowns() {
    return this._towns;
  }

  getUsefulLinks() {
    return this._usefulLinks;
  }


}

