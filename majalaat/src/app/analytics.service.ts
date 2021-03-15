import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AnalyticsService {

  constructor() { }


  logEvent(){
    firebase.analytics().logEvent('notification_received');
  }
}
