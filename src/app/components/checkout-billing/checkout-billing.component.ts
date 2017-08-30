import { Component, OnInit } from '@angular/core';
import { GlobalService } from '../../services/global.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-checkout-billing',
  template: `
    <h2>Checkout</h2>
    <div class="card container">
      <div class="card-header">
        <h3>Billing address</h3>
      </div>
      <div class="card-body text-center">
        <p class="card-text">
          <input class="form-control" placeholder="Name (first & last)" [(ngModel)]="order.billing.name">
          <input class="form-control" placeholder="Company (optional)" [(ngModel)]="order.billing.company">
          <input class="form-control" placeholder="Email" [(ngModel)]="order.billing.email">
          <input class="form-control" placeholder="Address" [(ngModel)]="order.billing.address">
          <input class="form-control" placeholder="City" [(ngModel)]="order.billing.city">
        </p>
      </div>
      <div class="card-footer text-muted">
        <button class="btn btn-primary" (click)="goTo('checkout/payment')">Continue</button>
      </div>
    </div>
  `,
  styles: [
    `

    `
  ]
})
export class CheckoutBillingComponent implements OnInit {
  order: any;

  constructor(public globalService: GlobalService, public router: Router) {

    this.globalService.order.subscribe(currentOrder => {
      this.order = currentOrder;
      if (!this.order) {
        this.router.navigateByUrl('cart');
      }
      if (!this.order.billing) {
        this.order.billing = {};
      }
    });
  }

  ngOnInit() {
    if (!this.order) {
      this.router.navigateByUrl('checkout/shipping');
    }
  }

  goTo(url: string) {
    if (this.order.billing.name &&
      this.order.billing.email &&
      this.order.billing.address &&
      this.order.billing.city) {
      this.globalService.order.next(this.order);
      this.router.navigateByUrl(url);
    }
  }

}
