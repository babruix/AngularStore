import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { GlobalService } from '../../services/global.service';
import { AngularFireDatabase } from 'angularfire2/database';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-login',
  template: `
    <div class="login-frame">
      <re-captcha *ngIf="!captchaResolved && !(user | async)?.uid" 
                  (resolved)="captchaResolved = true" 
                  siteKey="{{ siteKey }}"></re-captcha>
      <button (click)="login()" class="btn btn-default" *ngIf="captchaResolved && !(user | async)?.uid">
        <img class="google-icon" src="../../assetss/google-icon.png">
        Sign In
      </button>
      <img src="{{ (user | async)?.photoURL }}" class="user-photo">
      <button class="btn btn-default" (click)="logout()" *ngIf="(user | async)?.uid">Logout</button>
      <a class="nav-link" routerLink="register" *ngIf="!(user | async)?.uid">Register</a>
    </div>
  `,
  styles: [
    `
      .user-photo {
        max-width: 83px;
      }
      .google-icon {
        max-width: 30px;
      }
    `
  ]
})
export class LoginComponent implements OnInit {

  user: Observable<firebase.User>;
  siteKey: string;
  public captchaResolved: boolean;

  constructor(public afAuth: AngularFireAuth
    , public globalService: GlobalService
    , public db: AngularFireDatabase) {

    this.siteKey = environment.captchaKey;
    this.user = afAuth.authState;
    this.captchaResolved = false;

    this.user.subscribe(currentUser => {
      globalService.user.next(currentUser);

      if (currentUser) {
        this.db.object('/users/' + currentUser.uid).update({
          uid: currentUser.uid,
          email: currentUser.email
        });

        this.db.object('/users/' + currentUser.uid).subscribe((user) => {
          if (user.cart) {
            globalService.cart.next(user.cart);
          }
        });
      }

      if (!currentUser && window.localStorage.getItem('cart')) {
        // For guest, set cart from local storage
        const localStorageCart = JSON.parse(window.localStorage.getItem('cart'));
        this.globalService.cart.next(localStorageCart);
      }
    });
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
