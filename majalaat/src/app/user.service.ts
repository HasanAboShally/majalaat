import { Injectable } from '@angular/core';
import { fromEvent, Subject } from 'rxjs';
import { filter, map } from 'rxjs/operators';
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

    // window.addEventListener('storage', e => {
    //   this._load();
    //   console.log("changed");
    // });


    fromEvent<StorageEvent>(window, 'storage').pipe(
      // listen to our storage key
      filter(evt => evt.key === 'user'),
      filter(evt => evt.newValue !== null),
      // deserialize the stored actions
      // get the last stored action from the actions array
      map(evt => {

        console.log(JSON.parse(evt.newValue)[0]);

      }),
    ).subscribe();



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
    // this.user.remainingCredit--;

    this.canContact = this._canContact();
    this._save();

    return this.user.remainingCredit;

  }





}
