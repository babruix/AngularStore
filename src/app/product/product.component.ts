import { Component, ElementRef, EventEmitter, HostBinding, Input, OnInit, Output } from '@angular/core';
import { IProduct } from '../models/IProduct';
import { Observable } from 'rxjs/Observable';
import * as fromRoot from '../reducers';
import { Store } from '@ngrx/store';
import { AnimateDirective } from '../directives/animate.directive';

@Component({
  selector: 'app-product',
  template: `
    <div class="card" [ngStyle]="{'background-color': productColor$ |async}">
      <div class="card-header text-right">
        <button type="button" class="close btn btn-outline-secondary"
                aria-label="Close" ngbTooltip="Remove"
                (click)="removeProduct()">
          <i class="fa fa-trash-o" aria-hidden="true"></i>
        </button>
        
        <h2>{{product.title}}</h2>
        <p>{{product.price | currency:'USD':true}}</p>
      </div>
      
      <div class="card-body text-center">
        <p class="card-text">{{product.description}}</p>
      </div>
      
      <div class="card-footer text-muted">
        <div *ngIf="product.inCart">
          <span>Added to Cart</span>
          <button class="btn btn-default btn-sm" type="button" (click)="addToCart(product)">Remove from Cart</button>
        </div>

        <div *ngIf="!product.inCart">
          <div class="quantity-label">Qty</div>
          <input class="form-control" type="number" min="1" [(ngModel)]="product.quantity">
          <button class="btn btn-success" type="button" (click)="addToCart(product)">Add to cart</button>
        </div>
       
      </div>
    </div>
  `,
  styles: [`
    .card {
      margin-top: 1rem;
      margin-bottom: 1rem;
      position: relative;
      min-height: 5rem;
      box-shadow: 2px 2px 2px 0 rgba(0, 0, 0, 0.1);
    }

    .close {
      margin: -12px -21px 0 0;
      padding: 0 5px;
    }
  `],
})
export class ProductComponent implements OnInit {
  @Input() product: IProduct;
  @Output() 'onRemove' = new EventEmitter<IProduct>();
  @Output() onInCartToggle = new EventEmitter<IProduct>();
  @HostBinding('class') classes = 'col-3';
  public productColor$: Observable<string>;

  constructor(private store: Store<fromRoot.State>
              , private productElement: ElementRef
              , private animator: AnimateDirective) {
    this.productColor$ = this.store.select(fromRoot.getToolbarColor);
  }

  ngOnInit() {
    this.store.select(fromRoot.getToolbarColor)
      .subscribe(color => {
        this.animator.animateColor(this.productElement.nativeElement.querySelector('.card'), color);
      });
    this.animator.animationIn(this.productElement);
  }

  removeProduct() {
    this.animator.animationOut(this.productElement, () => {
      this.onRemove.emit(this.product);
    });
  }

  addToCart() {
    this.animator.animationOut(this.productElement, () => {
      this.onInCartToggle.emit(this.product);
    });
  }
}
