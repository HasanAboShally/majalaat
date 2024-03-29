import { Injectable } from '@angular/core';
import { GoogleSheetsService } from '../shared/google-sheets.service';
import { environment } from '../environments/environment';
import { Volunteer, VolunteerName, VOLUNTEER_CONTACT_CHANNEL, VOLUNTEER_GENDER, VOLUNTEER_STATUS } from './volunteer/volunteer.class';
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

  private _partners;


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
    const volunteersSheetName = environment.backend.googleSheet.sheets.volunteers.name;
    const usefulLinksSheetName = environment.backend.googleSheet.sheets.usefulLinks.name;
    const partnersSheetName = environment.backend.googleSheet.sheets.partners.name;

    let volunteers$ = this.gsx.getTable(googleSheetId, volunteersSheetName);
    let usefulLinks$ = this.gsx.getTable(googleSheetId, usefulLinksSheetName);
    let partners$ = this.gsx.getTable(googleSheetId, partnersSheetName);


    forkJoin([volunteers$, usefulLinks$, partners$]).pipe(map(([volunteersTable, usefulLinksTable, partnersTable]) => {

      this._volunteers = this._extractVolunteers(volunteersTable.rows);

      this._fields = [...new Set(volunteersTable.columns['field'].map(function (x: string) { if (x) return x.trim() }))].sort(); // keep only unique values
      this._institutes = [...new Set(volunteersTable.columns['institute'].map(function (x: string) { if (x) return x.trim() }))].sort();
      this._towns = [...new Set(volunteersTable.columns['town'].map(function (x: string) { if (x) return x.trim() }))].sort();

      usefulLinksTable.rows.shift(); // remove headers row
      usefulLinksTable.columns['category'].shift();
      this._usefulLinksCategories = [...new Set(usefulLinksTable.columns['category'])];

      this._usefulLinks = this._extractUsefulLinks(usefulLinksTable.rows);


      this._partners = this._extractPartners(partnersTable.rows);

      this._ready.next(true);

    })).subscribe();

  }

  private _extractPartners(rows) {

    let partners = {};

    rows.forEach(row => {

      if (row.approved != "نعم") {
        return
      }

      if (row.logourl) {
        row.logourl = GoogleSheetsService.getFileDirectURL(row.logourl)
      }

      partners[row.partnerid] = row;
    });

    return partners;
  }

  private _extractVolunteers(rows) {

    let volunteers = {};

    rows.forEach(row => {

      let v = this._volunteerFromRow(row);

      if (v.isShow) {
        v.field = v.field.trim();
        v.institute = v.institute.trim();
        v.town = v.town.trim();
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

    function _extractHowToContact(row) {
      return (row.howtocontact === "البريد الالكتروني") ? VOLUNTEER_CONTACT_CHANNEL.EMAIL : VOLUNTEER_CONTACT_CHANNEL.WHATSAPP;
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
      town: row.town?.trim(),
      bio: row.bio,
      phone: row.phone,
      profileLink: row.profilelink,
      institute: row.institute?.trim(),
      field: row.field?.trim(),
      photoURL: GoogleSheetsService.getFileDirectURL(row.photourl),
      graduationYear: row.graduationyear,
      howToContact: _extractHowToContact(row),
      status: _extractStatus(row),
      isShow: _extractIsShown(row)
    });
  }

  getVolunteers() {
    return Object.values(this._volunteers);
  }

  getVolunteersByIds(ids) {
    return Object.values(this._volunteers);
  }

  getVolunteersCount() {
    return Object.values(this._volunteers).length;
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

  getPartnerById(id) {
    return this._partners[id];
  }


}

