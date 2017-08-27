import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';

@Component({
  selector: 'admin-users',
  template: `
    <div class="button-container">
      <button md-raised-button routerLink="/admin/add-user">Add a User</button>
    </div>
    <div class="user" *ngFor="let user of users | async">
      <div class="content">
        {{user.email}}
      </div>
      <div class="active">
        <span *ngIf="user.active">Active</span>
        <span *ngIf="!user.active">Inactive</span>
      </div>
    </div>
  `,
  styles: [`
    .button-container {
      text-align: right;
    }

    .button-container button {
      margin: 30px;
    }

    .user {
      margin-bottom: 5px;
    }

    .user .content {
      display: inline-block;
      width: calc(100% - 100px);
    }

    .user .active {
      display: inline-block;
      width: 80px;
    }
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
