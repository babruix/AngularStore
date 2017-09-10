import { Component, OnInit, ElementRef, HostListener } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { AngularFireDatabase } from 'angularfire2/database';
import { AnimateDirective } from '../../directives/animate.directive';
import { GlobalService } from 'app/services/global.service';
import { Router } from '@angular/router';

import { PaymentService } from '../../services/payment.service';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-checkout-payment',
  template: `
    <ngb-alert *ngIf="successMessage" type="success"
               (close)="hideMessage()">
      {{ successMessage }}
    </ngb-alert>
    <h1>Order Review:</h1>
    <app-order [order]="order"></app-order>
    
    <button class="btn btn-primary" (click)="handlePayment()">Pay now</button>
  `,
  styles: []
})
export class CheckoutPaymentComponent implements OnInit {
  private success = new Subject<string>();
  successMessage: string;
  hashCode: any;
  order: any;
  handler: any;
  globalCart: any;
  cartArray: any;
  orderTotal: number;

  constructor(private db: AngularFireDatabase
    , private animator: AnimateDirective
    , private elem: ElementRef
    , private globalService: GlobalService
    , private router: Router
    , private paymentSvc: PaymentService) {

    this.handler = StripeCheckout.configure({
      key: environment.stripeKey,
      locale: 'auto',
      token: token => {
        this.paymentSvc.processPayment(token, this.orderTotal)
      }
    });
  }

  ngOnInit() {
    const user = this.globalService.user.getValue()
      , time = new Date().getTime()
      , uid = user.uid;
    this.hashCode = this.globalService.hashCode(time + uid);
    this.order = this.globalService.order.getValue();
    this.order.products = this.globalService.cart.getValue();
    this.order.uid = uid;

    this.success
      .subscribe((message) => {
        this.successMessage = message;
        setTimeout(() => this.hideMessage(), 1);
      });

    this.handler = StripeCheckout.configure({
      key: environment.stripeKey,
      locale: 'auto',
      token: token => {
        this.paymentSvc.processPayment(token, this.orderTotal)
        this.createOrder();
      }
    });

    this.cartArray = [];

    this.globalService.cart.subscribe((cart) => {
      this.globalCart = cart;
      this.cartArray = [];
      this.cartArray = (<any>Object).values(this.globalCart);
      this.orderTotal = this.cartArray
        .reduce((a, b) => a + b.total, 0);
    });
  }

  handlePayment() {
    this.handler.open({
      name: 'Angular Commerce',
      description: 'Process with the order',
      amount: this.orderTotal
    });
  }
  @HostListener('window:popstate')
  onPopstate() {
    this.handler.close()
  }

  createOrder() {
    this.db
      .object('/orders/' + Math.abs(this.hashCode))
      .set(this.order);

    this.showSuccessMessage();
  }

  public showSuccessMessage() {
    this.success
      .next(`Order was successfully created.`);
  }

  hideMessage() {
    this.animator
      .slideUpOut(this.elem.nativeElement.querySelector('.alert')
        , () => {
          this.successMessage = '';
          this.globalService.order.next(null);
          this.globalService.cart.next(null);
          this.router.navigateByUrl('orders');
        });
  }
}
