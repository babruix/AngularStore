import { Component, OnInit, ElementRef } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { AngularFireDatabase } from 'angularfire2/database';
import { AnimateDirective } from '../../directives/animate.directive';
import { GlobalService } from 'app/services/global.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-checkout-payment',
  template: `
    <ngb-alert *ngIf="successMessage" type="success"
               (close)="hideMessage()">
      {{ successMessage }}
    </ngb-alert>
    <button class="btn btn-primary" (click)="createOrder()">Pay now</button>
  `,
  styles: []
})
export class CheckoutPaymentComponent implements OnInit {
  private success = new Subject<string>();
  successMessage: string;
  hashCode: any;
  order: any;

  constructor(private db: AngularFireDatabase
    , private animator: AnimateDirective
    , private elem: ElementRef
    , private globalService: GlobalService
    , private router: Router) {

  }

  ngOnInit() {
    const user = this.globalService.user.getValue();
    const time = new Date().getTime()
      , uid = user.uid;
    this.hashCode = this.globalService.hashCode(time + uid);

    this.globalService.order.subscribe(currentOrder => {
      this.order = currentOrder;
      if (!this.order) {
        this.router.navigateByUrl('cart');
      }

      if (!this.order.shipping) {
        this.router.navigateByUrl('checkout/shipping');
      }
      if (!this.order.billing) {
        this.router.navigateByUrl('checkout/billing');
      }
    });

    this.success
      .subscribe((message) => {
        this.successMessage = message;
        setTimeout(() => this.hideMessage(), 1);
      });
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
          this.router.navigateByUrl('store');
        });
  }
}
