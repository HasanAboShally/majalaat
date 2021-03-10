import { Injectable } from '@angular/core';
import { GoogleSheetsService } from '../shared/google-sheets.service';
import { environment } from '../environments/environment';
import { Volunteer } from './volunteer/volunteer.class';
import { map } from 'rxjs/operators';
import { BehaviorSubject, Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class BackendService {

  private _volunteers;
  private _fields;
  private _institutes;
  private _towns;

  private _googleSheetId;
  private _volunteersSheetIndex;


  private _ready = new BehaviorSubject(false);
  public ready = this._ready.asObservable();

  constructor(private gsx: GoogleSheetsService) {

    this._googleSheetId = environment.backend.googleSheet.id;
    this._volunteersSheetIndex = environment.backend.googleSheet.sheets.volunteers.index;


    // this._loadVolunteers();
    this._loadData();

  }

  private _loadData() {

    this.gsx.getTable(this._googleSheetId, this._volunteersSheetIndex).pipe(map(table => {

      table.rows.shift(); // remove headers row
      table.columns['field'].shift();
      table.columns['institute'].shift();
      table.columns['town'].shift();

      this._volunteers = this._extractVolunteers(table.rows);

      this._fields = [...new Set(table.columns['field'])]; // keep only unique values
      this._institutes = [...new Set(table.columns['institute'])];
      this._towns = [...new Set(table.columns['town'])];

      this._ready.next(true);

    })).subscribe();
  }

  private _extractVolunteers(rows) {

    let volunteers = {};

    rows.forEach(row => {

      let v = Volunteer.fromRow(row);

      if (v.isShow) {
        volunteers[v.id] = v;
      }
    });

    return volunteers

  }

  getVolunteers() {
    return Object.values(this._volunteers);
  }

  getVolunteer(id) {
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
}
