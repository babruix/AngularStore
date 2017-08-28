import { Component, ElementRef, OnInit } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { AnimateDirective } from '../../directives/animate.directive';

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
          <th>Remove</th>
        </tr>
        </thead>
        <tbody>
        <tr *ngFor="let user of users | async">
          <td>{{user.email}}</td>
          <td >
            <span *ngIf="user.active">Active</span>
            <span *ngIf="!user.active">Inactive</span>
          </td>
          <td>
            <button type="button" class="close btn btn-outline-secondary"
                    aria-label="Close" ngbTooltip="Remove"
                    (click)="removeUser(user)">
              <i class="fa fa-trash-o" aria-hidden="true"></i>
            </button>
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

  constructor(public db: AngularFireDatabase
  , private productElement: ElementRef
  , private animator: AnimateDirective) {
    this.users = db.list('/users');
  }

  ngOnInit() {
  }

  removeUser(user) {
    this.animator.animationOut(this.productElement, () => {
      this.db.list('/users/' + user.$key).remove();
    });
  }
}
