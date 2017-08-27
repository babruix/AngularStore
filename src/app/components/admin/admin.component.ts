import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin',
  template: `
    <app-new-product-input></app-new-product-input>
  `,
  styles: []
})
export class AdminComponent implements OnInit {

  user: Observable<firebase.User>;
  currentUserID: string;

  constructor(public db: AngularFireDatabase, public afAuth: AngularFireAuth, public router: Router) {

    // this.store = db.list('/products');
    this.user = afAuth.authState;

    this.user.subscribe(currentUser => {
      if (!currentUser) {
        this.router.navigateByUrl('login');
      } else {
        this.currentUserID = currentUser.uid;
      }
    });
  }

  ngOnInit() {

  }
}
