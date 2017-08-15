import {Component, EventEmitter, HostBinding, HostListener, OnInit, Output, ViewChild} from '@angular/core';
import {ICard} from '../models/ICard';
import {NgForm} from '@angular/forms';

@Component({
  selector: 'app-new-card-input',
  template: `
    <div class="card">
      <div class="card-block">
        <form #form="ngForm">
          <input placeholder="Take a note..." class="form-control" name="text" [(ngModel)]="newCard.text" required>
        </form>
      </div>
    </div>
  `,
  styles: [
    '.card { margin-bottom: 1.5rem; }',
  ],
})
export class NewCardInputComponent implements OnInit {
  @HostBinding('class') class = 'col-8';
  @Output() onCardAdd = new EventEmitter<string>();

  @ViewChild('form') public form: NgForm;

  public newCard: ICard = {text: ''};

  @HostListener('document:keypress', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    if (event.charCode === 13 && this.form.valid) {
      this.addCard(this.form.value.text);
    }
  }

  constructor() { }

  ngOnInit() {
  }

  addCard(text) {
    this.onCardAdd.emit(text);
    this.newCard.text = '';
  }
}
