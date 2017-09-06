import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';

@Component({
  selector: 'app-admin-orders',
  template: `
    <table class="table table-striped">
      <thead>
      <tr>
        <th>Order ID</th>
        <th>View</th>
        <th>Edit</th>
        <th>Delete</th>
      </tr>
      </thead>
      <tbody>
      <tr *ngFor="let order of orders | async">
        <td>{{order.$key}}</td>
        <td><a routerLink="/admin/order/{{order.$key}}">VIEW</a></td>
        <td>
          <button type="button" class="edit btn btn-outline-secondary"
                  aria-label="Edit" ngbTooltip="Edit"
                  (click)="editOrder(order)">
            <i class="fa fa-pencil" aria-hidden="true"></i>
          </button>
        </td>
        <td>
          <button type="button" class="close btn btn-outline-secondary"
                  aria-label="Remove" ngbTooltip="Remove"
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
  constructor(private af: AngularFireDatabase) { }

  ngOnInit() {
    this.orders = this.af.list('/orders');
  }

  editOrder(order) {

  }

  removeOrder(order) {

  }
}
