import { inject, Injectable } from '@angular/core';
import { addDoc, collection, doc, Firestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  firestore: Firestore = inject(Firestore);
  loading = false;


  getUsersColRef() {
    return collection(this.firestore, 'users');
  }


  getSingleDocRef(colId:string, docId:string) {
    return doc(collection(this.firestore, colId), docId);
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