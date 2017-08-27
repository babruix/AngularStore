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
      <div class="product">
        <div class="product-header">
          <app-color-input></app-color-input>
        </div>
        <div class="product-block">
          <input placeholder="Take a note..." class="form-control" name="text"
                 [formControl]="newProductForm.controls['text']"
                 ngbTooltip="Fill in text for your new product and press Enter">
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
      .product {
        margin-bottom: 1rem;
        margin-top: -4em;
      }

      .product-block input {
        padding-left: 28px;
      }

      .product-block i {
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
      this.addProduct(this.newProductForm.controls['text'].value);
    }
  }

  constructor(private store: Store<fromRoot.State>
              , fb: FormBuilder
              , private productElement: ElementRef
              , private animator: AnimateDirective) {

    this.newProductForm = fb.group({
      'text': [null, Validators.compose([
        Validators.required, Validators.minLength(2)
        ]
      )],
    });
  }

  ngOnInit() {
    this.store.select(fromRoot.getToolbarColor)
      .subscribe(color => {
        this.animator.animateColor(this.productElement.nativeElement.querySelector('.product'), color);
      });

    this.success
      .subscribe((message) => {
        this.successMessage = message;
        setTimeout(() => this.animator
          .slideDownIn(this.productElement.nativeElement.querySelector('.alert')), 1);
      });

    debounceTime.call(this.success, 5000)
      .subscribe(() => this.hideMessage());

    this.animator.animationIn(this.productElement);
  }

  ngOnDestroy() {
    this.alive = false;
  }

  addProduct(text) {
    this.store.dispatch(new productActions.AddProductAction(text));
    this.newProductForm.reset();
    this.showSuccessMessage();
  }

  public showSuccessMessage() {
    this.success
      .next(`New product was successfully created.`);
  }

  hideMessage() {
    this.animator
      .slideUpOut(this.productElement.nativeElement.querySelector('.alert')
        , () => this.successMessage = '');
  }
}
