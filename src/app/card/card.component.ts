import {Component, HostBinding, Input, OnInit} from '@angular/core';
import {ICard} from '../models/ICard';

@Component({
  selector: 'app-card',
  template: `
    <div class="card">
      <div class="card-block">
        <p class="card-text">{{ card.text }}</p>
        <label class="custom-control custom-checkbox">
          <input type="checkbox" class="custom-control-input" [checked]="card.pinned"
                 (change)="card.pinned = !card.pinned"/>
          <span class="custom-control-indicator"></span>
        </label>
      </div>
    </div>
  `,
  styles: [
    '.card {margin-top: 1.5rem;}'
  ],
})
export class CardComponent implements OnInit {
  @Input() card: ICard;
  @HostBinding('class') classes = 'col-2';

  constructor() {
  }

  ngOnInit() {
  }

}
