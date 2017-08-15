import {Component, EventEmitter, HostBinding, HostListener, OnDestroy, OnInit, Output, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, NgForm, Validators} from '@angular/forms';
import {dummyValidator} from '../shared/dummy.validator';

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
  @Output() onCardAdd = new EventEmitter<string>();

  @ViewChild('form') public form: NgForm;

  newCardForm: FormGroup;
  private alive = true;

  @HostListener('document:keypress', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    if (event.charCode === 13 && this.newCardForm.valid) {
      this.addCard(this.newCardForm.controls['text'].value);
    }
  }

  constructor(fb: FormBuilder) {
    this.newCardForm = fb.group({
      'text': [null, Validators.compose([
          Validators.required, Validators.minLength(2), dummyValidator
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
    this.onCardAdd.emit(text);
    this.newCardForm.controls['text'].setValue('');
  }
}
