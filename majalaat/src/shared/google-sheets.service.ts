import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class GoogleSheetsService {

  private GOOGLE_SCRIPT_ID = "AKfycbwxsIeAByq256rUMcO300BJ5-clapa3oscEpUx5VQS7brxO9uETyFoyBDj98BSDDYE";

  constructor(private http: HttpClient) { }

  public getRows(googleSheetId, sheetName?) {

    return this._getJson({ googleSheetId: googleSheetId, sheetName: sheetName, rows: true }).pipe(map(response => {
      return (<any>response).rows;
    }));
  }

  public getColumns(googleSheetId, sheetName?) {

    return this._getJson({ googleSheetId: googleSheetId, sheetName: sheetName, columns: true, rows: false }).pipe(map(response => {
      return (<any>response).rows;
    }));
  }


  public getTable(googleSheetId, sheetName?) {

    return this._getJson({ googleSheetId: googleSheetId, sheetName: sheetName, columns: true, rows: true }).pipe(map(response => {
      return (<any>response);
    }));
  }

  private _getJson(params) {

    let googleSheetId = params.googleSheetId,
      sheetName = params.sheetName || 1,
      query = params.q,
      useIntegers = params.integers || true,
      showRows = params.rows,
      showColumns = params.columns,
      url = "https://script.google.com/macros/s/"+this.GOOGLE_SCRIPT_ID+"/exec?documentId="+googleSheetId+"&sheetName="+sheetName;


    return this.http.get<any>(url).pipe(map(data => {

      if(!data){
        return {}
      }

      var rows = data;
      var columns = {};

      var keys =Object.keys(rows[0]);

      keys.forEach(key=>{
        columns[key] = []
      });
      
      rows.forEach(row => {
        keys.forEach(key=>{
          columns[key].push(row[key])
        })
      });

      return {
        rows:rows,
        columns:columns
      }

    }));

  };

  public static getFileDirectURL(driveURL) {

    if (!driveURL || typeof driveURL != 'string') {
      return null;
    }

    const fileId = driveURL.split('id=')[1];

    if (fileId == null) {
      return null;
    }


    return "https://drive.google.com/uc?export=view&id=" + fileId;
  }

}
