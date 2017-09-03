import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-checkout-payment',
  template: `
    <button class="btn btn-primary">
      Pay now</button>
  `,
  styles: []
})
export class CheckoutPaymentComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
