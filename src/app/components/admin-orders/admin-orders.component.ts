import { Component, ElementRef, OnInit } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { AnimateDirective } from '../../directives/animate.directive';
import { AngularFireAuth } from 'angularfire2/auth';

@Component({
  selector: 'app-admin-orders',
  template: `
    <table class="table table-striped">
      <thead>
      <tr>
        <th>Order ID</th>
        <th>View</th>
        <th></th>
      </tr>
      </thead>
      <tbody>
      <tr *ngFor="let order of orders | async">
        <td>{{order.$key}}</td>
        <td>
          <div class="card">
            <div class="card-header">
              Order Status: {{ order.status || 'pending'}}
              <select *ngIf="userRole==='admin'"
                      class="form-control" name="status"
                      [(ngModel)]="order.status"
                      (change)="updateOrderStatus(order)">
                <option value="pending">Pending</option>
                <option value="approved">Approved</option>
                <option value="shipped">Shipped</option>
                <option value="received">Received</option>
              </select>
            </div>
            <div class="card-block">
              <h4 class="card-title">Billing info:</h4>
              <h6 class="card-subtitle mb-2 text-muted">
                {{order.billing|json}}
              </h6>
              <h4 class="card-title">Shipping info:</h4>
              <h6 class="card-subtitle mb-2 text-muted">
                {{order.shipping|json}}
              </h6>
              <h4 class="card-title">Products:</h4>
              <p class="card-text">
                {{order.products|json}}
              </p>
            </div>
          </div>
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
  userRole: string
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

  updateOrderStatus(order) {
    this.af.object('/orders/' + order.$key).update({
      status: order.status
    });
  }

  removeOrder(order) {
    this.animator.animationOut(this.orderElement, () => {
      this.af.list('/orders/' + order.$key).remove();
    });
  }
}
