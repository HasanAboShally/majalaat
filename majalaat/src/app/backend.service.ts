import { Injectable } from '@angular/core';
import { GoogleSheetsService } from '../shared/google-sheets.service';
import { environment } from '../environments/environment';
import { Volunteer } from './volunteer/volunteer.class';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class BackendService {

  constructor(private gsx: GoogleSheetsService) { }

  getVolunteers() {

    const googleSheetId = environment.backend.googleSheet.id;
    const sheetIndex = environment.backend.googleSheet.sheets.volunteers.index;

    return this.gsx.getRows(googleSheetId, sheetIndex).pipe(map(rows => {

      rows.shift(); // remove headers row

      let volunteers = [];

      rows.forEach(row => {

        let v = Volunteer.fromRow(row);

        if (v.isShow) {
          volunteers.push(v);
        }
      });

      return volunteers;

    }));

  }

}
