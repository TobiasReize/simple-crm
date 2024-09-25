import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogActions, MatDialogContent, MatDialogRef, MatDialogTitle } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { provideNativeDateAdapter } from '@angular/material/core';
import { User } from '../../models/user.class';
import { FirebaseService } from '../firebase-service/firebase.service';
import { MatProgressBarModule } from '@angular/material/progress-bar';


@Component({
  selector: 'app-dialog-add-user',
  standalone: true,
  providers: [provideNativeDateAdapter()],
  imports: [FormsModule, MatButtonModule, MatDialogContent, MatDialogActions, MatDialogTitle, MatFormFieldModule, MatInputModule, MatDatepickerModule, MatProgressBarModule],
  templateUrl: './dialog-add-user.component.html',
  styleUrl: './dialog-add-user.component.scss'
})
export class DialogAddUserComponent {

  user = new User();
  birthDate!: Date;
  readonly dialogRef = inject(MatDialogRef<DialogAddUserComponent>);


  constructor(public firebaseService: FirebaseService) { }


  async saveUser() {
    this.firebaseService.loading = true;    
    this.user.birthDate = this.birthDate.getTime();
    await this.firebaseService.addData(this.user.toJSON());
    this.cancel();
  }


  cancel() {
    this.dialogRef.close();
  }
}