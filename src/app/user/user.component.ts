import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { DialogAddUserComponent } from '../dialog-add-user/dialog-add-user.component';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatCardModule } from '@angular/material/card';
import { FirebaseService } from '../firebase-service/firebase.service';
import { DocumentData, onSnapshot, Unsubscribe } from '@angular/fire/firestore';
import { RouterModule } from '@angular/router';


@Component({
  selector: 'app-user',
  standalone: true,
  imports: [RouterModule, MatButtonModule, MatIconModule, MatTooltipModule, MatDialogModule, MatCardModule],
  templateUrl: './user.component.html',
  styleUrl: './user.component.scss'
})
export class UserComponent implements OnInit, OnDestroy {

  readonly dialog = inject(MatDialog);
  allUsers: DocumentData[] = [];
  unsubUsersCol!: Unsubscribe;

  constructor(private firebaseService: FirebaseService) { }


  ngOnInit(): void {
    let usersColRef = this.firebaseService.getUsersColRef();
    this.unsubUsersCol = onSnapshot(usersColRef, usersCollection => {
      this.allUsers = [];
      usersCollection.forEach(user => {
        this.allUsers.push(this.setUserObject(user.data(), user.id));
      });
      console.log('All users (inkl. id):', this.allUsers);
    });
  }


  setUserObject(obj: any, id: string) {
    return {
      firstName: obj.firstName,
      lastName: obj.lastName,
      birthDate: obj.birthDate,
      street: obj.street,
      zipCode: obj.zipCode,
      city: obj.city,
      email: obj.email,
      id: id
    }
  }


  openDialog() {
    const dialogRef = this.dialog.open(DialogAddUserComponent);
  }


  ngOnDestroy(): void {
    this.unsubUsersCol();
  }
}