import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(public afAuth: AngularFireAuth
              , public db: AngularFireDatabase
              , public router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {

    return this.afAuth.authState.map((auth) => {
      if (!auth) {
          this.router.navigateByUrl('login');
          return false;
      }

      // Check admin routes access
      const root = this.router.parseUrl(state.url).root;
      if (root.children.primary.segments.length 
        && root.children.primary.segments[0].path === 'admin') {

        this.db.object('/users/' + auth.uid).subscribe(u => {

          // only admin and manager can visit admin pages
          if (u.role !== 'admin' && u.role !== 'manager') {
            this.router.navigate(['/']);
          }
          
          // manager should not be able to visit admin/users page
          if (u.role === 'manager' && root.children.primary.segments[1].path === 'users') {
            this.router.navigate(['/']);
          }
        });
      }

      return true;
    }).take(1);
  }
}
