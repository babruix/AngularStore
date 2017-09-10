import { Component, Input, OnInit } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';

@Component({
  selector: 'app-order',
  template: `
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
  `,
  styles: []
})
export class OrderComponent implements OnInit {
  @Input() order: any;
  userRole: string;

  constructor(private af: AngularFireDatabase
              , public afAuth: AngularFireAuth) { }

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

  updateOrderStatus(order) {
    this.af.object('/orders/' + order.$key).update({
      status: order.status
    });
  }
}
