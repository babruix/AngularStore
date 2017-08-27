import { Component, OnDestroy, OnInit } from '@angular/core';
import 'rxjs/add/operator/map';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import * as fromRoot from '../reducers';
import 'rxjs/add/operator/takeWhile';
import * as productActions from '../actions/product';

@Component({
  selector: 'app-product-list',
  template: `
    <div class="container-fluid">
      <ngb-tabset>
        <ngb-tab title="Products Catalog">
          <ng-template ngbTabContent>
            <div class="row product-columns">
              <app-product *ngFor="let product of getAllProducts() | async"
                           [product]="product"
                           (onRemove)="removeProduct($event)"
                           (onInCartToggle)="toggleCart($event)"></app-product>
            </div>
          </ng-template>
        </ngb-tab>
        <ngb-tab title="Your Cart" *ngIf="anyInCart$ | async">
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
  public anyInCart$: Observable<boolean>;
  private alive = true;

  constructor(private store: Store<fromRoot.State>) {
    this.anyInCart$ = this.getInCart()
      .takeWhile(() => this.alive)
      .map((products) => products.length > 0);

    this.store
      .select(fromRoot.getProducts)
      .takeWhile(() => this.alive)
      .map(products => products.length > 0);
  }

  ngOnInit() {
  }

  ngOnDestroy(): void {
    this.alive = false;
  }

  getAllProducts() {
    return this.store.select(fromRoot.getProducts)
      .takeWhile(() => this.alive);
  }

  getInCart() {
    return this.store.select(fromRoot.getProducts)
      .takeWhile(() => this.alive)
      .map((productArr) => productArr
        .filter(product => product.inCart));
  }

  removeProduct(product) {
    this.store.dispatch(new productActions.RemoveAction(product));
  }

  toggleCart(product) {
    this.store.dispatch(new productActions.ToggleCartAction(product));
  }
}
