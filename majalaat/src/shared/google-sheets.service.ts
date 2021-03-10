import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class GoogleSheetsService {

  constructor(private http: HttpClient) { }

  public getRows(googleSheetId, sheetIndex?) {

    return this._getJson({ googleSheetId: googleSheetId, sheetIndex: sheetIndex, rows: true }).pipe(map(response => {
      return (<any>response).rows;
    }));
  }

  public getColumns(googleSheetId, sheetIndex?) {

    return this._getJson({ googleSheetId: googleSheetId, sheetIndex: sheetIndex, columns: true, rows: false }).pipe(map(response => {
      return (<any>response).rows;
    }));
  }


  public getTable(googleSheetId, sheetIndex?) {

    return this._getJson({ googleSheetId: googleSheetId, sheetIndex: sheetIndex, columns: true, rows: true }).pipe(map(response => {
      return (<any>response);
    }));
  }

  private _getJson(params) {

    let googleSheetId = params.googleSheetId,
      sheetIndex = params.sheetId || 1,
      query = params.q,
      useIntegers = params.integers || true,
      showRows = params.rows,
      showColumns = params.columns,
      url = 'https://spreadsheets.google.com/feeds/list/' + googleSheetId + '/' + sheetIndex + '/public/values?alt=json';

    return this.http.get<any>(url).pipe(map(data => {

      var responseObj = {};
      var rows = [];
      var columns = {};

      if (data && data.feed && data.feed.entry) {

        for (var i = 0; i < data.feed.entry.length; i++) {

          var entry = data.feed.entry[i];
          var keys = Object.keys(entry);
          var newRow = {};
          var queried = !query;

          for (var j = 0; j < keys.length; j++) {

            var gsxCheck = keys[j].indexOf('gsx$');

            if (gsxCheck > -1) {
              var key = keys[j];
              var name = key.substring(4);
              var content = entry[key];
              var value = content.$t;

              if (query) {
                if (value.toLowerCase().indexOf(query.toLowerCase()) > -1) {
                  queried = true;
                }
              }

              if (Object.keys(params).indexOf(name) > -1) {
                queried = false;
                if (value.toLowerCase() === params[name].toLowerCase()) {
                  queried = true;
                }
              }

              if (useIntegers === true && !isNaN(value)) {
                value = Number(value);
              }

              newRow[name] = value;

              if (queried === true) {
                if (!columns.hasOwnProperty(name)) {
                  columns[name] = [];
                  columns[name].push(value);
                } else {
                  columns[name].push(value);
                }
              }

            }
          }

          if (queried === true) {
            rows.push(newRow);
          }
        }

        if (showColumns === true) {
          responseObj['columns'] = columns;
        }

        if (showRows === true) {
          responseObj['rows'] = rows;
        }

        return responseObj;

      }
    }));

  };

}
