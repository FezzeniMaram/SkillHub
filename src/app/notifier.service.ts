import { Injectable } from '@angular/core';
import {MatSnackBar, MatSnackBarModule} from "@angular/material/snack-bar";

@Injectable({
  providedIn: 'root'
})
export class NotifierService {

  constructor(private snackBar: MatSnackBar) {}
  showNotication(displayMessage: string  ="notification ", buttonText : string = "ok" ){
    this.snackBar.open(displayMessage,buttonText,{
      duration:5000,
      horizontalPosition: 'center',
      verticalPosition : 'top',
        panelClass: ['custom-snackbar']
    }
    )
  }
}
