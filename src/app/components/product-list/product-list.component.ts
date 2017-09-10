import { Component, OnInit } from '@angular/core';
import 'rxjs/add/operator/map';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';

@Component({
  selector: 'app-product-list',
  template: `
    <app-color-input></app-color-input>
    <div class="container-fluid">
      <div class="row product-columns">
        <app-product *ngFor="let product of products | async"
                     [product]="product"
                     (onRemove)="removeProduct($event)"
                     (onInCartToggle)="toggleCart($event)"></app-product>
      </div>
    </div>
  `,
  styles: [`

  `]
})
export class ProductListComponent implements OnInit {
  products: FirebaseListObservable<any>;

  constructor(public db: AngularFireDatabase
    ) {
    this.products = db.list('/products');
  }

  ngOnInit() {
  }

  getInCart() {
    return this.products
      .map((productArr) => productArr
        .filter(product => product.inCart));
  }

  removeProduct(product) {
    // this.store.dispatch(new productActions.RemoveAction(product));
  }

  toggleCart(product) {
    // this.store.dispatch(new productActions.ToggleCartAction(product));
  }
}
