import { Component, ElementRef, HostBinding, HostListener, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { Subject } from 'rxjs/Subject';
import { debounceTime } from 'rxjs/operator/debounceTime';
import { AnimateDirective } from '../../directives/animate.directive';
import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import { Observable } from 'rxjs/Observable';
import * as firebase from 'firebase/app';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-new-product-input',
  template: `
    <div class="container">
      <div class="card">
        <div class="card-header">
          <h1>Add a Product</h1>
          <app-color-input></app-color-input>
        </div>
        <ngb-alert *ngIf="successMessage" type="success"
                   (close)="hideMessage()">
          {{ successMessage }}
        </ngb-alert>
        <div class="card-block">
          <input placeholder="Title" class="form-control" name="title"
                 [(ngModel)]="title"
                 [formControl]="newProductForm.controls['title']"
                 ngbTooltip="Fill in Title">
          <i class="fa fa-plus-circle" aria-hidden="true"></i>
        </div>
        <div class="card-block">
          <input placeholder="Price" class="form-control" name="price"
                 type="number" step="0.01"
                 [(ngModel)]="price"
                 [formControl]="newProductForm.controls['price']"
                 ngbTooltip="Fill in Price">
          <i class="fa fa-plus-circle" aria-hidden="true"></i>
        </div>
        <div class="card-block">
          <input placeholder="Product Description..." class="form-control" name="description"
                 [(ngModel)]="description"
                 [formControl]="newProductForm.controls['description']"
                 ngbTooltip="Fill in Description">
          <i class="fa fa-plus-circle" aria-hidden="true"></i>
        </div>
        <button class="btn btn-primary" 
                (click)="addProduct(newProductForm.controls['title'].value
                , newProductForm.controls['price'].value
                , newProductForm.controls['description'].value)">
          Add Product</button>
      </div>
    </div>
  `,
  styles: [
      `
      .card {
        margin-bottom: 1rem;
      }

      .card-block input {
        padding-left: 28px;
      }

      .card-block i {
        float: left;
        padding: 0 7px;
        margin-top: -28px;
      }
    `,
  ],
})
export class NewProductInputComponent implements OnInit, OnDestroy {
  @HostBinding('class') class = 'col-8';
  @ViewChild('form') public form: NgForm;

  newProductForm: FormGroup;
  products: FirebaseListObservable<any[]>;
  user: Observable<firebase.User>;
  private alive = true;
  private success = new Subject<string>();
  successMessage: string;

  isEditing: boolean;
  currentProduct: FirebaseObjectObservable<any>;
  productKey: string;
  title: string;
  description: string;
  price: string;

  @HostListener('document:keypress', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    const enterKey = event.keyCode ? event.keyCode : event.which;
    if (enterKey === 13 && this.newProductForm.valid) {
      this.addProduct(this.newProductForm.controls['title'].value,
        this.newProductForm.controls['price'].value,
        this.newProductForm.controls['description'].value);
    }
  }

  constructor(fb: FormBuilder
              , private cardElement: ElementRef
              , private animator: AnimateDirective
              , public afAuth: AngularFireAuth
              , public af: AngularFireDatabase
              , public route: ActivatedRoute
              , public router: Router) {
    this.products = af.list('/products', {
      query: {
        limitToLast: 50
      }
    });
    this.user = this.afAuth.authState;
    const validatorsAll = Validators.compose([Validators.required, Validators.minLength(2)]);
    this.newProductForm = fb.group({
      'title': [null, validatorsAll],
      'price': [null, validatorsAll],
      'description': [null, validatorsAll],
    });
  }

  ngOnInit() {

    this.success
      .subscribe((message) => {
        this.successMessage = message;
        setTimeout(() => this.animator
          .slideDownIn(this.cardElement.nativeElement.querySelector('.alert')), 1);
      });
    debounceTime.call(this.success, 3000)
      .subscribe(() => this.hideMessage());
    this.animator.animationIn(this.cardElement);

    this.route.params.subscribe((params: Params) => {
      if (params && params.key) {
        this.isEditing = true;
        this.productKey = params.key;
        this.currentProduct = this.af
          .object('/products/' + params.key);

        this.currentProduct.subscribe(p => {
          this.title = p.title;
          this.description = p.description;
          this.price = p.price;
        });
      } else {
        this.title = null;
        this.description = null;
        this.price = null;
      }
    });
  }

  ngOnDestroy() {
    this.alive = false;
  }

  addProduct(newTitle: string, newPrice: string, newDescription: string) {
    if (!newTitle || !newPrice || !newDescription) {
      return;
    }

    if (this.isEditing && this.productKey) {
      this.currentProduct = this.af.object('/products/' + this.productKey);

      this.currentProduct.update({
        title: newTitle,
        description: newDescription,
        price: newPrice,
      });
    } else {
      this.products.push({
        title: newTitle,
        description: newDescription,
        price: newPrice
      });
    }
    this.newProductForm.reset();
    this.showSuccessMessage();
  }

  public showSuccessMessage() {
    this.success
      .next(`New product was successfully saved.`);
  }

  hideMessage() {
    this.animator
      .slideUpOut(this.cardElement.nativeElement.querySelector('.alert')
        , () => {
        this.successMessage = '';
        if (this.isEditing) {
          this.router.navigateByUrl('admin/products');
        }
      });
  }
}
