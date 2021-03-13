import { Injectable } from '@angular/core';
import { EncryptionService } from './encryption.service';
import { User } from './user.class';



@Injectable({
  providedIn: 'root'
})
export class UserService {

  public user: User;
  public canContact;

  constructor() {
    this.user = this._load();

    if (!this.user) {
      this._createUser();
    }

    this.canContact = this._canContact();

  }

  private _canContact() {

    this._load();
    return this.user.remainingCredit > 0;
  }

  private _createUser() {

    this.user = new User();

    this._save();

  }

  private _load() {

    let localUser = localStorage.getItem("user");

    if (!localUser) {
      return null;
    }

    let userStr = EncryptionService.decrypt(localUser);
    return <User>JSON.parse(userStr);

  }

  private _save() {
    let userStr = EncryptionService.encrypt(JSON.stringify(this.user));
    localStorage.setItem("user", userStr);
  }


  public consumeContactCredit() {

    this._load();
    this.user.remainingCredit--;

    this.canContact = this._canContact();
    this._save();

    return this.user.remainingCredit;

  }





}
