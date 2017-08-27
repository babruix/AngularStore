import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { AngularFireAuth } from 'angularfire2/auth';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(public afAuth: AngularFireAuth, public router: Router) {}

  canActivate() {
    console.log('AuthGuard#canActivate called');
    return this.afAuth.authState.map((auth) => {
        if (!auth) {
          this.router.navigateByUrl('login');
          return false;
        }
        return true;
    }).take(1);
  }
}
