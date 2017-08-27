import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';

@Component({
  selector: 'app-login',
  template: `
    LOGIN>
    <div class="login-frame">
      <button class="btn btn-default" (click)="login()" *ngIf="!(user | async)?.uid">
        <img src="../../assets/google-icon.png">
        Sign In with Google
      </button>
      <img src="{{ (user | async)?.photoURL }}" class="user-photo">
      <button class="btn btn-default" (click)="logout()" *ngIf="(user | async)?.uid">Logout</button>
    </div>
  `,
  styles: [
    `
      .user-photo {
        max-width: 200px;
      }
    `
  ]
})
export class LoginComponent implements OnInit {

  user: Observable<firebase.User>;

  constructor(public afAuth: AngularFireAuth) {
    this.user = afAuth.authState;
  }

  login() {
    this.afAuth.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
  }

  logout() {
    this.afAuth.auth.signOut();
  }

  ngOnInit() {
  }

}
