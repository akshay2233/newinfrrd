import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class MatsnackbarService {

  constructor(private _snackBar: MatSnackBar) { }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 2000,
      verticalPosition: 'top'

    });
  }

  fnGetRideDetails() {
    var data = window.localStorage.getItem('rideDetails');
    if (data) {
      return JSON.parse(data);
    } else {
      return null;
    }
  }
  fnSetRideDetails(data) {
    var setData = JSON.stringify(data);
    window.localStorage.setItem('rideDetails', setData);
  }

  fnRemoveRideDetails() {
    var data = window.localStorage.removeItem('rideDetails');
  }

}
