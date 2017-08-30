import { Component, OnInit } from '@angular/core';
import { GlobalService } from '../../services/global.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-checkout-shipping',
  template: `
    <div class="container">
      <h2>Checkout</h2>
      <a class="btn btn-link btn-xs nav-link" routerLink="checkout/shipping">
        <i class="fa fa-arrow-circle-o-left" style="font-size:2.5rem;"></i>Back to store</a>
    </div>
    <div class="card container">
      <div class="card-header">
        <h3>Shipping address</h3>
      </div>
      <div class="card-body text-center">
        <p class="card-text">
          <input class="form-control" placeholder="Full Name (first & last)" [(ngModel)]="order.shipping.name">
        </p>
        <p class="card-text">
          <input class="form-control" placeholder="Email" [(ngModel)]="order.shipping.email">
        </p>
        <p class="card-text">
          <input class="form-control" placeholder="Address" [(ngModel)]="order.shipping.address">
        </p>
        <p class="card-text">
          <input class="form-control" placeholder="City" [(ngModel)]="order.shipping.city">
        </p>
      </div>

      <div class="card-footer text-muted">
        <button class="btn btn-primary" (click)="goTo('checkout/billing')">Continue</button>
      </div>
    </div>
  `,
  styles: [
      `
      .container {
        margin: 30px auto;
        max-width: 600px;
        padding: 0;
      }

      input,
      select {
        display: block;
      }

      select {
        margin: 20px auto 21px auto;
      }
    `
  ]
})
export class CheckoutShippingComponent implements OnInit {
  order: any;

  constructor(public globalService: GlobalService, public router: Router) {
    this.globalService.order.subscribe(currentOrder => {
      this.order = currentOrder;
      if (!this.order) {
        this.router.navigateByUrl('');
      }
      if (!this.order.shipping) {
        this.order.shipping = {};
      }
    });
  }

  goTo(url: string) {
    if (this.order.shipping.name &&
      this.order.shipping.email &&
      this.order.shipping.address &&
      this.order.shipping.city) {
      this.globalService.order.next(this.order);
      this.router.navigateByUrl(url);
    }
  }

  ngOnInit() {
  }

}
