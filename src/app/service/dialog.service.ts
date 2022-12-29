import { Injectable } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { SpinnerLoadingComponent } from '../components/shared/spinner-loading/spinner-loading.component';

@Injectable({
  providedIn: 'root',
})
export class DialogService {
    spinnerDialogRef!: MatDialogRef<SpinnerLoadingComponent>;

    constructor(public dialog: MatDialog) {}
  
  
    showSpinnerDialog() {
      this.spinnerDialogRef = this.dialog.open(SpinnerLoadingComponent, {
        panelClass: "reset-class",
        disableClose: true
      })
    }
  
    hideSpinnerDialog() {
      this.spinnerDialogRef.close();
    }
  }
  