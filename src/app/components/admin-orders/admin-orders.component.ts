import { Component, ElementRef, OnInit } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { AnimateDirective } from '../../directives/animate.directive';

@Component({
  selector: 'app-admin-orders',
  template: `
    <table class="table table-striped">
      <thead>
      <tr>
        <th>Order ID</th>
        <th>View</th>
        <th>Delete</th>
      </tr>
      </thead>
      <tbody>
      <tr *ngFor="let order of orders | async">
        <td>{{order.$key}}</td>
        <td>
          {{order |json}}
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
  constructor(private af: AngularFireDatabase
              , private orderElement: ElementRef
              , private animator: AnimateDirective) { }

  ngOnInit() {
    this.orders = this.af.list('/orders');
  }

  removeOrder(order) {
    this.animator.animationOut(this.orderElement, () => {
      this.af.list('/orders/' + order.$key).remove();
    });
  }
}
