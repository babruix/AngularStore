import { Component, OnInit } from '@angular/core';
import { GlobalService } from '../../services/global.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-checkout-shipping',
  template: `
    <div class="card container">
      <h3>Shipping Info</h3>
      <input placeholder="Name (first & last)" [(ngModel)]="order.shipping.name">
        <input placeholder="Email" [(ngModel)]="order.shipping.email">
        <input placeholder="Address" [(ngModel)]="order.shipping.address">
        <input placeholder="City" [(ngModel)]="order.shipping.city">
      <button (click)="goTo('checkout/billing')">Continue</button>
    </div>
  `,
  styles: [
    `
      .container {
        margin: 30px auto;
        max-width: 600px;
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
