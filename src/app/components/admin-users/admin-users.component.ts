import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';

@Component({
  selector: 'app-admin-users',
  template: `    
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
