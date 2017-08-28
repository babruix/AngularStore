import { Component, ElementRef, OnInit } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { AnimateDirective } from '../../directives/animate.directive';

@Component({
  selector: 'app-admin-products',
  template: `
    <h2>Products</h2>
    <app-new-product-input></app-new-product-input>
    <div class="table-responsive">
      <table class="table table-striped">
        <thead>
        <tr>
          <th>Title</th>
          <th>Price</th>
          <th>Description</th>
          <th></th>
          <th></th>
        </tr>
        </thead>
        <tbody>
        <tr *ngFor="let product of products | async">
          <td>{{product.title}}</td>
          <td>{{product.price | currency:'USD':true }}</td>
          <td>{{product.description}}</td>
          <td>
            <button type="button" class="edit btn btn-outline-secondary"
                    aria-label="Edit" ngbTooltip="Edit"
                    (click)="editProduct(product)">
              <i class="fa fa-pencil" aria-hidden="true"></i>
            </button>
          </td>
          <td>
            <button type="button" class="close btn btn-outline-secondary"
                    aria-label="Close" ngbTooltip="Remove"
                    (click)="removeProduct(product)">
              <i class="fa fa-trash-o" aria-hidden="true"></i>
            </button>
          </td>
        </tr>
        </tbody>
      </table>
    </div>
  `,
  styles: [`
    .edit {
      padding: 0 5px;
      border: none;
      font-size: 20px;
    }
  `]
})
export class AdminProductsComponent implements OnInit {

  products: FirebaseListObservable<any>;

  constructor(public db: AngularFireDatabase
  , private productElement: ElementRef
  , private animator: AnimateDirective) {
    this.products = db.list('/products');
  }

  ngOnInit() {
  }

  removeProduct(product) {
    this.animator.animationOut(this.productElement, () => {
      this.db.list('/products/' + product.$key).remove();
    });
  }

  editProduct(product) {
    this.db.object('/products/' + product.$key)
      .update({ email: product.email, active: !product.active });
  }
}
