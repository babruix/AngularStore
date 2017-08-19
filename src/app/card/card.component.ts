import {Component, EventEmitter, HostBinding, Input, OnInit, Output} from '@angular/core';
import {ICard} from '../models/ICard';

@Component({
  selector: 'app-card',
  template: `
    <div class="card">
      <div class="card-header text-right">
        <button type="button" class="close" aria-label="Close" (click)="removeCard()">
          <span>&times;</span>
        </button>
      </div>
      <div class="card-block">
        <p class="card-text">{{ card.text }}</p>
      </div>
      <div class="card-footer text-muted">
        <label class="custom-control custom-checkbox">
          <input type="checkbox" class="custom-control-input" [checked]="card.pinned"
                 (change)="card.pinned = !card.pinned"/>
          <span class="custom-control-indicator"></span>
        </label>
      </div>
    </div>
  `,
  styles: [`
    .card {
      margin-bottom: 1rem;
      position: relative;
      min-height: 200px;
      box-shadow: 2px 2px 2px 0 rgba(0, 0, 0, 0.4);
      padding: 1rem;
      background-color: #fe0;
    }
  `],
})
export class CardComponent implements OnInit {
  @Input() card: ICard;
  @Output() 'onRemove' = new EventEmitter<ICard>();
  @HostBinding('class') classes = 'col-2';

  constructor() {
  }

  ngOnInit() {
  }

  removeCard() {
    this.onRemove.emit(this.card);
  }

}
