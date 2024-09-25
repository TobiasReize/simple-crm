import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { ActivatedRoute } from '@angular/router';
import { FirebaseService } from '../firebase-service/firebase.service';
import { onSnapshot, Unsubscribe } from '@angular/fire/firestore';
import { User } from '../../models/user.class';
import { MatDialog } from '@angular/material/dialog';
import { DialogEditAddressComponent } from '../dialog-edit-address/dialog-edit-address.component';
import { DialogEditUserComponent } from '../dialog-edit-user/dialog-edit-user.component';


@Component({
  selector: 'app-user-detail',
  standalone: true,
  imports: [MatCardModule, MatIconModule, MatButtonModule, MatMenuModule],
  templateUrl: './user-detail.component.html',
  styleUrl: './user-detail.component.scss'
})
export class UserDetailComponent implements OnInit, OnDestroy {

  readonly dialog = inject(MatDialog);
  userId = '';
  user: User = new User();
  unsubUser!: Unsubscribe;

  constructor(private route: ActivatedRoute, public firebaseService: FirebaseService) { }


  ngOnInit(): void {
    this.route.params.subscribe(params => {
        this.userId = params['id'];
        this.getUser();
      }
    );
  }


  getUser() {
    this.unsubUser = onSnapshot(this.firebaseService.getSingleDocRef('users', this.userId), user => {
      this.user = new User(user.data());  //wird eine Instanz des Users, damit auf die einzelnen Properties zugeriffen werden kann! (Vorteil der OOP)
    });
  }


  editUserAddress() {
    const dialogRefAddress = this.dialog.open(DialogEditAddressComponent);
    dialogRefAddress.componentInstance.user = new User(this.user.toJSON());   //es wird eine neue Instanz des Users mit den Daten des aktuellen Users erstellt! (somit wird dem Dialog eine Kopie des Users übergeben!)
    dialogRefAddress.componentInstance.userId = this.userId;
  }


  editUserHeader() {
    const dialogRefUser = this.dialog.open(DialogEditUserComponent);
    dialogRefUser.componentInstance.user = new User(this.user.toJSON());    //es wird eine neue Instanz des Users mit den Daten des aktuellen Users erstellt! (somit wird dem Dialog eine Kopie des Users übergeben!)
    dialogRefUser.componentInstance.userId = this.userId;
    // dialogRefUser.componentInstance.birthDate = this.user.birthDate;
  }


  ngOnDestroy(): void {
    this.unsubUser();
  }
}
