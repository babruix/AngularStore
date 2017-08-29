import { Component, OnInit } from '@angular/core';
import { GlobalService } from '../../services/global.service';

@Component({
  selector: 'app-user-cart',
  template: `    
    <div class="card" [ngStyle]="{'background-color': productColor$ |async}">
      <div class="card-header text-right">
        <h3>Your Cart</h3>
        <div class="no-items" *ngIf="cartArray.length === 0">You do not have any products in the cart.</div>
      </div>
      <div class="card-body text-left">
        <div *ngFor="let item of cartArray" class="card-text">
          <div class="item">{{item.title}}</div>
          <div class="price">{{item.price | currency:'USD':true}}</div>
          <div class="quantity">
            <input class="close btn btn-outline-secondary" 
                   type="number" min="1" value="1" 
                   [(ngModel)]="item.quantity" 
                   (change)="updateCart(item)">
          </div>
          <div class="total">
            <div class="total">{{item.total | currency:'USD':true}}</div>
          </div>
        </div>
      </div>
      <div class="card-footer text-primary" *ngIf="cartArray.length > 0">
        Total: {{cardTotal | currency:'USD':true}}
      </div>
    </div>
  `,
  styles: [
    `
      h3,
      .no-items {
        text-align: center;
      }

      .item {
        display: inline-block;
        width: 50%;
      }

      .price,
      .quantity,
      .total {
        display: inline-block;
        width: 15%;
      }

      .quantity input {
        width: 35px;
      }
    `
  ]
})
export class UserCartComponent implements OnInit {

  globalCart: any;
  cartArray: any;
  cardTotal: number;

  constructor(public globalService: GlobalService) {
    this.cartArray = [];

    globalService.cart.subscribe((cart) => {
      this.globalCart = cart;
      this.cartArray = [];
      this.cartArray = (<any>Object).values(this.globalCart);
      window.localStorage.setItem('cart', JSON.stringify(this.globalCart));
    });
  }

  updateCart(item) {
    this.globalCart[item.key] = item;
    if (!item.quantity) {
      item.quantity = 1;
    }

    this.globalCart[item.key]['total'] = item.quantity * item.price;
    this.globalService.cart.next(this.globalCart);
    this.cardTotal = this.cartArray
      .reduce((a, b) => a + b.total, 0);
  }
  ngOnInit() {
  }
}
