import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import * as firebase from 'firebase/app';
import { Observable } from 'rxjs/Observable';
import { AngularFireAuth } from 'angularfire2/auth';

@Component({
  selector: 'app-user-orders',
  template: `
    <h1>My orders</h1>
    <table class="table table-striped">
      <thead>
      <tr>
        <th>Order ID</th>
        <th></th>
      </tr>
      </thead>
      <tbody>
      <tr *ngFor="let order of orders | async">
        <td>{{order.$key}}</td>
        <td>
          <app-order [order]="order"></app-order>
        </td>
      </tr>
      </tbody>
    </table>
  `,
  styles: []
})
export class UserOrdersComponent implements OnInit {

  currentUser: Observable<firebase.User>;
  orders: FirebaseListObservable<any>;

  constructor(private af: AngularFireDatabase
            , private angularFireAuth: AngularFireAuth) {
    this.currentUser = angularFireAuth.authState;
  }

  ngOnInit() {
    this.currentUser.subscribe(user => {
      this.orders = this.af.list('/orders', {
        query: {
          orderByChild: 'uid',
          equalTo: user.uid
        }
      });
    });
  }

}
