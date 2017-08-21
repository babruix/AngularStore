import { Component, ElementRef, HostBinding, HostListener, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Subject } from 'rxjs/Subject';
import { debounceTime } from 'rxjs/operator/debounceTime';
import * as fromRoot from '../reducers';
import * as cardActions from '../actions/card';
import { AnimateDirective } from '../directives/animate.directive';

@Component({
  selector: 'app-new-card-input',
  template: `
    <div class="container">
      <div class="card">
        <div class="card-header">
          <app-color-input></app-color-input>
        </div>
        <div class="card-block">
          <input placeholder="Take a note..." class="form-control" name="text"
                 [formControl]="newCardForm.controls['text']"
                 ngbTooltip="Fill in text for your new card and press Enter">
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
export class NewCardInputComponent implements OnInit, OnDestroy {
  @HostBinding('class') class = 'col-8';
  @ViewChild('form') public form: NgForm;

  newCardForm: FormGroup;
  private alive = true;
  private success = new Subject<string>();
  successMessage: string;

  @HostListener('document:keypress', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    const enterKey = event.keyCode ? event.keyCode : event.which;
    if (enterKey === 13 && this.newCardForm.valid) {
      this.addCard(this.newCardForm.controls['text'].value);
    }
  }

  constructor(private store: Store<fromRoot.State>
              , fb: FormBuilder
              , private cardElement: ElementRef
              , private animator: AnimateDirective) {

    this.newCardForm = fb.group({
      'text': [null, Validators.compose([
        Validators.required, Validators.minLength(2)
        ]
      )],
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

  addCard(text) {
    this.store.dispatch(new cardActions.AddCardAction(text));
    this.newCardForm.reset();
    this.showSuccessMessage();
  }

  public showSuccessMessage() {
    this.success
      .next(`New card was successfully created.`);
  }

  hideMessage() {
    this.animator
      .slideUpOut(this.cardElement.nativeElement.querySelector('.alert')
        , () => this.successMessage = '');
  }
}
