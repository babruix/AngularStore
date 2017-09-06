import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';

@Component({
  selector: 'app-admin-orders',
  template: `
    <div class="card" *ngFor="let order of orders | async">
      <div class="card-title">
        Order ID: {{order.$key}}
      </div>
      <div class="card-text">
        VIEW / EDIT / DELETE
      </div>
    </div>
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

}
