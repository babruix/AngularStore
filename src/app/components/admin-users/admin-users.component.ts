import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';

@Component({
  selector: 'app-admin-users',
  template: `
    <h2>Users</h2>
    <div class="table-responsive">
      <table class="table table-striped">
        <thead>
        <tr>
          <th>Email</th>
          <th>Status</th>
        </tr>
        </thead>
        <tbody>
        <tr *ngFor="let user of users | async">
          <td>{{user.email}}</td>
          <td >
            <span *ngIf="user.active">Active</span>
            <span *ngIf="!user.active">Inactive</span>
          </td>
        </tr>
        </tbody>
      </table>
    </div>
  `,
  styles: [`    
    
  `]
})
export class AdminUsersComponent implements OnInit {

  users: FirebaseListObservable<any>;

  constructor(public db: AngularFireDatabase) {
    this.users = db.list('/users');
  }

  ngOnInit() {
  }

}
