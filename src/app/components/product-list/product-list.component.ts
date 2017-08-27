import { Component, OnDestroy, OnInit } from '@angular/core';
import 'rxjs/add/operator/map';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';

@Component({
  selector: 'app-product-list',
  template: `
    <div class="container-fluid">
      <ngb-tabset>
        <ngb-tab title="Products Catalog">
          <ng-template ngbTabContent>
            <div class="row product-columns">
              <app-product *ngFor="let product of products | async"
                           [product]="product"
                           (onRemove)="removeProduct($event)"
                           (onInCartToggle)="toggleCart($event)"></app-product>
            </div>
          </ng-template>
        </ngb-tab>
        <ngb-tab title="Your Cart">
          <ng-template ngbTabContent>
            <div class="row product-columns">
              <app-product *ngFor="let product of getInCart() | async"
                           [product]="product"
                           (onRemove)="removeProduct($event)"
                           (onInCartToggle)="toggleCart($event)"></app-product>
            </div>
          </ng-template>
        </ngb-tab>
      </ngb-tabset>
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
