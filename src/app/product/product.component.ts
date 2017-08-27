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
                aria-label="Close" ngbTooltip="{{product.removed ? 'Revive' : 'Remove'}}"
                (click)="removeproduct()">
          <i class="fa {{product.removed ? 'fa-undo' : 'fa-trash-o'}}" aria-hidden="true"></i>
        </button>
      </div>
      <div class="card-body text-center">
        <p class="card-text">{{ product.text }}</p>
      </div>
      <div class="card-footer text-muted">
        <label class="custom-control custom-checkbox mb-2 mr-sm-2 mb-sm-0" ngbTooltip="{{ product.inCart === true ? 'Unpin?' : 'Pin?' }}">
          <input type="checkbox" class="custom-control-input"
                 [checked]="product.inCart"
                 (change)="updateInCart()">
          <span class="custom-control-indicator"></span>
        </label>
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

    .fa-undo:hover {
      animation: spin 1s infinite linear;
    }

    @keyframes spin {
      to {
        transform: rotateZ(-720deg)
      }
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

  removeproduct() {
    this.animator.animationOut(this.productElement, () => {
      this.onRemove.emit(this.product);
    });
  }

  updateInCart() {
    this.animator.animationOut(this.productElement, () => {
      this.onInCartToggle.emit(this.product);
    });
  }
}
