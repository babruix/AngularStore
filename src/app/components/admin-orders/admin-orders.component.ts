import { Component, ElementRef, OnInit } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { AnimateDirective } from '../../directives/animate.directive';
import { AngularFireAuth } from 'angularfire2/auth';

@Component({
  selector: 'app-admin-orders',
  template: `
    <h1>Manage orders</h1>
    <table class="table table-striped">
      <thead>
      <tr>
        <th>Order ID</th>
        <th></th>
        <th></th>
      </tr>
      </thead>
      <tbody>
      <tr *ngFor="let order of orders | async">
        <td>{{order.$key}}</td>
        <td>
          <app-order [order]="order"></app-order>
        </td>
        <td>
          <button type="button" class="close btn btn-outline-secondary"
                  aria-label="Remove" ngbTooltip="Remove"
                  *ngIf="userRole==='admin'"
                  (click)="removeOrder(order)">
            <i class="fa fa-trash-o" aria-hidden="true"></i>
          </button>
        </td>
      </tr>
      </tbody>
    </table>
  `,
  styles: [`
    
  `]
})
export class AdminOrdersComponent implements OnInit {
  orders: FirebaseListObservable<any>;
  userRole: string;
  user;

  constructor(private af: AngularFireDatabase
              , private orderElement: ElementRef
              , private animator: AnimateDirective
              , public afAuth: AngularFireAuth) { }

  ngOnInit() {
    this.orders = this.af.list('/orders');
    this.afAuth.authState.subscribe(
      (auth) => {
        if (auth != null) {
          this.af.object('/users/' + auth.uid).subscribe(u => {
            this.userRole = u.role;
          });
        }
      });
  }

  removeOrder(order) {
    this.animator.animationOut(this.orderElement, () => {
      this.af.list('/orders/' + order.$key).remove();
    });
  }
}
