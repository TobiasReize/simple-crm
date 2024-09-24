import { inject, Injectable } from '@angular/core';
import { addDoc, collection, Firestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  firestore: Firestore = inject(Firestore);
  loading = false;


  getUsersColRef() {
    return collection(this.firestore, 'users');
  }


  async addData(data: any) {
    await addDoc(this.getUsersColRef(), data)
    .catch(
      (err) => {console.error(err);}
    ).then(
      (result) => {
        // console.log('Adding user finished', result);
        this.loading = false;
      }
    );
  }
}