import { Component, ElementRef, OnInit } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';
import { AnimateDirective } from '../../directives/animate.directive';
import { AngularFireAuth } from 'angularfire2/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-products',
  template: `
    <h2>Products</h2>
    <div class="btn-group" data-toggle="buttons">
      <label class="btn btn-link">
        <input type="checkbox" [(ngModel)]="showAddProductForm">Add Product
      </label>
    </div>
    <div [ngbCollapse]="showAddProductForm">
      <app-new-product-input></app-new-product-input>
    </div>
    
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
                    *ngIf="userRole==='admin'"
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
  showAddProductForm: boolean;
  userRole: string
  user;

  constructor(public db: AngularFireDatabase
              , private productElement: ElementRef
              , private animator: AnimateDirective
              , public router: Router
              , public afAuth: AngularFireAuth) {
                
    this.products = db.list('/products');
  }

  ngOnInit() {
    this.showAddProductForm = true;
    this.afAuth.authState.subscribe(
      (auth) => {
        if (auth != null) {
          this.db.object('users/' + auth.uid).subscribe(u => {
            this.userRole = u.role;
          });
        }
      });
  }

  removeProduct(product) {
    this.animator.animationOut(this.productElement, () => {
      this.db.list('/products/' + product.$key).remove();
    });
  }

  editProduct(product) {
    this.router.navigateByUrl('admin/edit-product/' + product.$key);
  }
}
