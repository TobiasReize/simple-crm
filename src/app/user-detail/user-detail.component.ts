import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { ActivatedRoute } from '@angular/router';
import { FirebaseService } from '../firebase-service/firebase.service';
import { onSnapshot, Unsubscribe } from '@angular/fire/firestore';
import { User } from '../../models/user.class';


@Component({
  selector: 'app-user-detail',
  standalone: true,
  imports: [MatCardModule, MatIconModule, MatButtonModule, MatMenuModule],
  templateUrl: './user-detail.component.html',
  styleUrl: './user-detail.component.scss'
})
export class UserDetailComponent implements OnInit, OnDestroy {

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
      this.user = new User(user.data());  //wird eine Instanz des Users damit auf die einzelnen Properties zugeriffen werden kann!
    });
  }


  editAddress() {

  }


  editUserHeader() {

  }


  ngOnDestroy(): void {
    this.unsubUser();
  }
}
