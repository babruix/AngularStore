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
        <ngb-tab title="Cart" *ngIf="anyInCard$ | async">
          <ng-template ngbTabContent>
            <div class="row product-columns">
              <app-product *ngFor="let product of getinCart() | async"
                           [product]="product"
                           (onRemove)="removeProduct($event)"
                           (onPinnedToggle)="toggleCart($event)"></app-product>
            </div>
          </ng-template>
        </ngb-tab>
        <ngb-tab title="Others" *ngIf="anyNotInCard$ | async">
          <ng-template ngbTabContent>
            <div class="row product-columns">
              <app-product *ngFor="let product of getinCart(false) | async"
                           [product]="product"
                           (onRemove)="removeProduct($event)"
                           (onPinnedToggle)="toggleCart($event)"></app-product>
            </div>
          </ng-template>
        </ngb-tab>
        <ngb-tab title="Removed" *ngIf="anyRemoved$ | async">
          <ng-template ngbTabContent>
            <div class="row product-columns">
              <app-product *ngFor="let product of getRemoved() | async"
                           [product]="product"
                           (onRemove)="removeProduct($event)"
                           (onPinnedToggle)="toggleCart($event)"></app-product>
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
  public anyInCard$: Observable<boolean>;
  public anyNotInCard$: Observable<boolean>;
  public anyRemoved$: Observable<boolean>;
  private alive = true;

  constructor(private store: Store<fromRoot.State>) {
    this.anyInCard$ = this.getinCart()
      .takeWhile(() => this.alive)
      .map((products) => products.length > 0);

    this.anyNotInCard$ = this.getinCart(false)
      .takeWhile(() => this.alive)
      .map((products) => products.length > 0);

    this.anyRemoved$ = this.getRemoved()
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

  getinCart(inCart = true) {
    return this.store.select(fromRoot.getProducts)
      .takeWhile(() => this.alive)
      .map((productArr) => productArr
        .filter(product => inCart
          ? product.inCart === true
          : product.inCart !== true)
        .filter(card => card.removed !== true));
  }

  removeProduct(product) {
    this.store.dispatch(new productActions.RemoveAction(product));
  }

  toggleCart(product) {
    this.store.dispatch(new productActions.ToggleCartAction(product));
  }

  getRemoved() {
    return this.store.select(fromRoot.getProducts)
      .takeWhile(() => this.alive)
      .map((productArr) => productArr
        .filter(product => product.removed === true));
  }
}
