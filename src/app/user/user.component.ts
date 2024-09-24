import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { DialogAddUserComponent } from '../dialog-add-user/dialog-add-user.component';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { User } from '../../models/user.class';
import { MatCardModule } from '@angular/material/card';
import { FirebaseService } from '../firebase-service/firebase.service';
import { DocumentData, onSnapshot, Unsubscribe } from '@angular/fire/firestore';


@Component({
  selector: 'app-user',
  standalone: true,
  imports: [MatButtonModule, MatIconModule, MatTooltipModule, MatDialogModule, MatCardModule],
  templateUrl: './user.component.html',
  styleUrl: './user.component.scss'
})
export class UserComponent implements OnInit, OnDestroy {

  readonly dialog = inject(MatDialog);
  user = new User();
  allUsers: DocumentData[] = [];
  unsubUsersCol!: Unsubscribe;

  constructor(private firebaseService: FirebaseService) { }


  ngOnInit(): void {
    let usersColRef = this.firebaseService.getUsersColRef();
    this.unsubUsersCol = onSnapshot(usersColRef, changes => {
      this.allUsers = [];
      changes.forEach(user => {
        this.allUsers.push(user.data());
      });
    });
  }


  openDialog() {
    const dialogRef = this.dialog.open(DialogAddUserComponent);
  }


  ngOnDestroy(): void {
    this.unsubUsersCol();
  }
}
