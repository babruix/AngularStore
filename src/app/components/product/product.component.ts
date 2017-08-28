import { Component, ElementRef, EventEmitter, HostBinding, Input, OnInit, Output } from '@angular/core';
import { IProduct } from '../../models/IProduct';
import { Observable } from 'rxjs/Observable';
import * as fromRoot from '../../reducers';
import { Store } from '@ngrx/store';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { AnimateDirective } from '../../directives/animate.directive';
import { GlobalService } from '../../services/global.service';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-product',
  template: `
    <div class="card" [ngStyle]="{'background-color': productColor$ |async}">
      <div class="card-header text-right">
        <button type="button" class="close btn btn-outline-secondary"
                aria-label="Close" ngbTooltip="Remove"
                (click)="removeProduct(product)">
          <i class="fa fa-trash-o" aria-hidden="true"></i>
        </button>
        
        <h2>{{product.title}}</h2>
        <p>{{product.price | currency:'USD':true}}</p>
      </div>
      
      <div class="card-body text-center">
        <p class="card-text">{{product.description}}</p>
      </div>
      
      <div class="card-footer text-muted">
        <div *ngIf="globalCart[product.$key]">
          <span>Already in Cart</span>
        </div>
        <div *ngIf="!globalCart[product.$key]">
          <button class="btn btn-success" type="button" (click)="addToCart(product)">Add to cart</button>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .close {
      margin: -12px -21px 0 0;
      padding: 0 5px;
    }
  `],
})
export class ProductComponent implements OnInit {
  @Input() product: any;
  @Output() 'onRemove' = new EventEmitter<IProduct>();
  @Output() onInCartToggle = new EventEmitter<IProduct>();
  @HostBinding('class') classes = 'col-3';
  public productColor$: Observable<string>;
  globalCart: any;
  private productContent: FirebaseListObservable<any[]>;

  constructor(public db: AngularFireDatabase
              , private store: Store<fromRoot.State>
              , private productElement: ElementRef
              , private animator: AnimateDirective
              , public globalService: GlobalService
              , public route: ActivatedRoute) {
    this.productColor$ = this.store.select(fromRoot.getToolbarColor);

    globalService.cart.subscribe((cart) => {
      this.globalCart = cart;
      window.localStorage.setItem('cart', JSON.stringify(this.globalCart));
      console.log('cart', cart);
    });
  }

  ngOnInit() {
    this.store.select(fromRoot.getToolbarColor)
      .subscribe(color => {
        this.animator
          .animateColor(this.productElement.nativeElement.querySelector('.card'), color);
      });
    this.animator.animationIn(this.productElement);

    this.route.params.subscribe((params: Params) => {
      this.productContent = this.db.list('/products', {
        query: {
          orderByChild: 'url',
          equalTo: params.url
        }
      });
    });
  }

  removeProduct(product) {
    this.animator.animationOut(this.productElement, () => {
        this.db.list('/products/' + product.$key).remove();
      });
  }

  addToCart(item) {
    this.globalCart[item.$key] = item;
    this.globalCart[item.$key]['key'] = item.$key;
    this.globalCart[item.$key]['total'] = (item.quantity * item.price);
    this.globalService.cart.next(this.globalCart);
  }
}
