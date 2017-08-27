import { Component, ElementRef, HostBinding, HostListener, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Subject } from 'rxjs/Subject';
import { debounceTime } from 'rxjs/operator/debounceTime';
import * as fromRoot from '../reducers';
import * as productActions from '../actions/product';
import { AnimateDirective } from '../directives/animate.directive';

@Component({
  selector: 'app-new-product-input',
  template: `
    <div class="container">
      <div class="card">
        <div class="card-header">
          <app-color-input></app-color-input>
        </div>
        <div class="card-block">
          <input placeholder="Title" class="form-control" name="title"
                 [formControl]="newProductForm.controls['title']"
                 ngbTooltip="Fill in Title... and press Tab">
          <i class="fa fa-plus-circle" aria-hidden="true"></i>
        </div>
        <div class="card-block">
          <input placeholder="Price" class="form-control" name="price"
                 [formControl]="newProductForm.controls['price']"
                 ngbTooltip="Fill in Price for your new product and press Enter">
          <i class="fa fa-plus-circle" aria-hidden="true"></i>
        </div>
        <div class="card-block">
          <input placeholder="Product Description..." class="form-control" name="description"
                 [formControl]="newProductForm.controls['description']"
                 ngbTooltip="Fill in Description and press Tab">
          <i class="fa fa-plus-circle" aria-hidden="true"></i>
        </div>
        <ngb-alert *ngIf="successMessage" type="success" 
                   (close)="hideMessage()">
          {{ successMessage }}
        </ngb-alert>
      </div>
    </div>
  `,
  styles: [
      `
      .card {
        margin-bottom: 1rem;
        margin-top: -4em;
      }

      .card-block input {
        padding-left: 28px;
      }

      .card-block i {
        float: left;
        padding: 0 7px;
        margin-top: -28px;
      }
      .alert {
        opacity: 0;
      }
    `,
  ],
})
export class NewProductInputComponent implements OnInit, OnDestroy {
  @HostBinding('class') class = 'col-8';
  @ViewChild('form') public form: NgForm;

  newProductForm: FormGroup;
  private alive = true;
  private success = new Subject<string>();
  successMessage: string;

  @HostListener('document:keypress', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    const enterKey = event.keyCode ? event.keyCode : event.which;
    if (enterKey === 13 && this.newProductForm.valid) {
      this.addProduct(this.newProductForm.controls['title'].value,
        this.newProductForm.controls['price'].value,
        this.newProductForm.controls['description'].value);
    }
  }

  constructor(private store: Store<fromRoot.State>
              , fb: FormBuilder
              , private cardElement: ElementRef
              , private animator: AnimateDirective) {

    const validatorsAll = Validators.compose([Validators.required, Validators.minLength(2)]);
    this.newProductForm = fb.group({
      'title': [null, validatorsAll],
      'price': [null, validatorsAll],
      'description': [null, validatorsAll],
    });
  }

  ngOnInit() {
    this.store.select(fromRoot.getToolbarColor)
      .subscribe(color => {
        this.animator.animateColor(this.cardElement.nativeElement.querySelector('.card'), color);
      });

    this.success
      .subscribe((message) => {
        this.successMessage = message;
        setTimeout(() => this.animator
          .slideDownIn(this.cardElement.nativeElement.querySelector('.alert')), 1);
      });

    debounceTime.call(this.success, 5000)
      .subscribe(() => this.hideMessage());

    this.animator.animationIn(this.cardElement);
  }

  ngOnDestroy() {
    this.alive = false;
  }

  addProduct(title, price, description) {
    this.store.dispatch(new productActions.AddProductAction({title, price, description}));
    this.newProductForm.reset();
    this.showSuccessMessage();
  }

  public showSuccessMessage() {
    this.success
      .next(`New product was successfully created.`);
  }

  hideMessage() {
    this.animator
      .slideUpOut(this.cardElement.nativeElement.querySelector('.alert')
        , () => this.successMessage = '');
  }
}
