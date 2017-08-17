import {Component, HostBinding, Input, OnInit} from '@angular/core';
import {ICard} from '../models/ICard';

@Component({
  selector: 'app-card',
  template: `
    <div class="card">
      <div class="card-header text-right">
        <label class="custom-control custom-checkbox">
          <input type="checkbox" class="custom-control-input" [checked]="card.pinned"
                 (change)="card.pinned = !card.pinned"/>
          <span class="custom-control-indicator"></span>
        </label>
      </div>
      <div class="card-block">
        <p class="card-text">{{ card.text }}</p>
      </div>
      <div class="card-footer text-muted">
        ...
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
  @HostBinding('class') classes = 'col-2';

  constructor() {
  }

  ngOnInit() {
  }

}
