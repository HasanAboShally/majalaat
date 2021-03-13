import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EncryptionService {

  constructor() { }

  public static encrypt(str) {

    return window.btoa(str);

  }

  public static decrypt(str) {
    return window.atob(str);
  }

}
