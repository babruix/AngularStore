import { Component, OnDestroy, OnInit } from '@angular/core';
import 'rxjs/add/operator/map';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';

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
export class ProductListComponent implements OnInit, OnDestroy {
  products: FirebaseListObservable<any>;
  private alive = true;

  constructor(public db: AngularFireDatabase
    ) {
    this.products = db.list('/products');
  }

  ngOnInit() {
  }

  ngOnDestroy(): void {
    this.alive = false;
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
