import { Component, inject, OnInit } from '@angular/core';
import { MatDialogActions, MatDialogContent, MatDialogRef, MatDialogTitle } from '@angular/material/dialog';
import { User } from '../../models/user.class';
import { FirebaseService } from '../firebase-service/firebase.service';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { provideNativeDateAdapter } from '@angular/material/core';

@Component({
  selector: 'app-dialog-edit-user',
  standalone: true,
  providers: [provideNativeDateAdapter()],
  imports: [FormsModule, MatButtonModule, MatDialogContent, MatDialogActions, MatDialogTitle, MatFormFieldModule, MatInputModule, MatProgressBarModule, MatDatepickerModule],
  templateUrl: './dialog-edit-user.component.html',
  styleUrl: './dialog-edit-user.component.scss'
})
export class DialogEditUserComponent implements OnInit {
  
  readonly dialogRef = inject(MatDialogRef<DialogEditUserComponent>);
  user!: User;
  userId = '';
  birthDate!: Date;

  constructor(public firebaseService: FirebaseService) { }


  ngOnInit(): void {
    this.birthDate = new Date(this.user.birthDate);
  }


  async saveUserHeader() {
    this.firebaseService.loading = true;
    this.user.birthDate = this.birthDate.getTime();
    await this.firebaseService.updateData(this.user.toJSON(), this.userId);   //data muss reines JSON-Objekt sein! (kein User-Objekt!)
    this.cancel();
  }
  

  cancel() {
    this.dialogRef.close();
  }
}
