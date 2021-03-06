import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { AngularFireDatabase } from 'angularfire2/database';

@Component({
  selector: 'app-sidebar',
  template: `
    <nav class="col-sm-3 col-md-2 hidden-xs-down bg-faded sidebar">
      <app-login></app-login>
      <ul class="nav nav-pills flex-column">
        <li class="nav-item">
          <a class="nav-link" routerLink="store">Store</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" routerLink="orders" *ngIf="(user | async)?.uid">My Orders</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" routerLink="admin/products" *ngIf="(user | async)?.uid">Manage Products</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" routerLink="admin/users" *ngIf="(user | async)?.uid && userRole==='admin'">Manage Users</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" routerLink="admin/orders" *ngIf="(user | async)?.uid">Manage Orders</a>
        </li>
      </ul>
    </nav>
  `,
  styles: [`
    .sidebar {
      padding-left: 0;
      padding-right: 0;
    }
    .sidebar {
      position: fixed;
      top: 50px;
      bottom: 0;
      left: 0;
      z-index: 1000;
      padding: 20px;
      overflow-x: hidden;
      overflow-y: auto;
      border-right: 1px solid #eee;
    }
  `]
})
export class SidebarComponent implements OnInit {
  user: Observable<firebase.User>;
  userRole: string;

  constructor(public afAuth: AngularFireAuth
              , private af: AngularFireDatabase) {
    this.user = afAuth.authState;
  }

  ngOnInit() {
    this.afAuth.authState.subscribe(
      (auth) => {
        if (auth != null) {
          this.af.object('/users/' + auth.uid).subscribe(u => {
            this.userRole = u.role;
          });
        }
      });
  }

}
