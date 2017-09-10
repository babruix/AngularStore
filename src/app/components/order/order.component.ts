import { Component, Input, OnInit } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import { Router } from '@angular/router';

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
        <h4 class="card-title">Products:</h4>
        <table class="table">
          <thead class="thead-inverse">
          <tr>
            <th>title</th>
            <th>description</th>
            <th>price</th>
            <th>quantity</th>
            <th>total</th>
          </tr>
          </thead>
          <tbody>
          <tr *ngFor="let product of products">
            <td>{{ product.title }}</td>
            <td>{{ product.description }}</td>
            <td>{{ product.price }}</td>
            <td>{{ product.quantity }}</td>
            <td>{{ product.total }}</td>
          </tr>
          </tbody>
        </table>
        
        <h4 class="card-title">Billing info:</h4>
        <table class="table">
          <thead class="thead-inverse">
          <tr>
            <th>Address</th>
            <th>City</th>
            <th>Email</th>
            <th>Name</th>
          </tr>
          </thead>
          <tbody>
          <tr>
            <td>{{ order.billing.address }}</td>
            <td>{{ order.billing.city }}</td>
            <td>{{ order.billing.email }}</td>
            <td>{{ order.billing.name }}</td>
          </tr>
          </tbody>
        </table>
        
        <h4 class="card-title">Shipping info:</h4>
        <table class="table">
          <thead class="thead-inverse">
          <tr>
            <th>Address</th>
            <th>City</th>
            <th>Email</th>
            <th>Name</th>
          </tr>
          </thead>
          <tbody>
          <tr>
            <td>{{ order.shipping.address }}</td>
            <td>{{ order.shipping.city }}</td>
            <td>{{ order.shipping.email }}</td>
            <td>{{ order.shipping.name }}</td>
          </tr>
          </tbody>
        </table>
        
      </div>
    </div>
  `,
  styles: []
})
export class OrderComponent implements OnInit {
  @Input() order: any;
  products: Array<any>;
  userRole: string;

  constructor(private af: AngularFireDatabase
              , private afAuth: AngularFireAuth
              , private router: Router) { }

  ngOnInit() {
    // Collect products of the order
    this.products = [];
    Object.keys(this.order.products).map(key => this.products.push(this.order.products[key]));

    // Do not look for the userRole when not on managing orders page
    if (this.router.url !== '/admin/orders') {
      return;
    }
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
