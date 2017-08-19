import {Component, HostBinding, HostListener, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, NgForm, Validators} from '@angular/forms';
import {Store} from '@ngrx/store';
import * as fromRoot from '../reducers';
import * as data from '../actions/card-actions';

@Component({
  selector: 'app-new-card-input',
  template: `
    <div class="card">
      <div class="card-block">
        <input placeholder="Take a note..." class="form-control" name="text" [formControl]="newCardForm.controls['text']">
      </div>
    </div>
  `,
  styles: [
    '.card { margin-bottom: 1.5rem; }',
  ],
})
export class NewCardInputComponent implements OnInit, OnDestroy {
  @HostBinding('class') class = 'col-8';

  @ViewChild('form') public form: NgForm;

  newCardForm: FormGroup;
  private alive = true;

  @HostListener('document:keypress', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    if (event.charCode === 13 && this.newCardForm.valid) {
      this.addCard(this.newCardForm.controls['text'].value);
    }
  }

  constructor(private store: Store<fromRoot.State>, fb: FormBuilder) {
    this.newCardForm = fb.group({
      'text': [null, Validators.compose([
          Validators.required, Validators.minLength(2)
        ]
      )],
    });
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    this.alive = false;
  }

  addCard(text) {
    this.store.dispatch(new data.AddCardAction({text: text, pinned: false}));
    this.newCardForm.reset();
  }
}
