import { Component, inject } from '@angular/core';
import { FirebaseService } from '../firebase-service/firebase.service';
import { MatDialogActions, MatDialogContent, MatDialogRef, MatDialogTitle } from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { User } from '../../models/user.class';

@Component({
  selector: 'app-dialog-edit-address',
  standalone: true,
  imports: [FormsModule, MatButtonModule, MatDialogContent, MatDialogActions, MatDialogTitle, MatFormFieldModule, MatInputModule, MatProgressBarModule],
  templateUrl: './dialog-edit-address.component.html',
  styleUrl: './dialog-edit-address.component.scss'
})
export class DialogEditAddressComponent {

  readonly dialogRef = inject(MatDialogRef<DialogEditAddressComponent>);
  user!: User;
  userId = '';

  constructor(public firebaseService: FirebaseService) { }


  async saveAddress() {
    this.firebaseService.loading = true;
    await this.firebaseService.updateData(this.user.toJSON(), this.userId);   //data muss reines JSON-Objekt sein! (kein User-Objekt!)
    this.cancel();
  }


  cancel() {
    this.dialogRef.close();
  }
}
