import {Component, EventEmitter, HostBinding, Input, OnInit, Output} from '@angular/core';
import {ICard} from '../models/ICard';
import {Observable} from 'rxjs/Observable';
import * as fromRoot from '../reducers';
import {Store} from '@ngrx/store';

@Component({
  selector: 'app-card',
  template: `
    <div class="card" [ngStyle]="{'background-color': cardColor$ |async}">
      <div class="card-header text-right">
        <button type="button" class="close btn btn-outline-secondary" aria-label="Close"
                (click)="removeCard()">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="card-body">
        <p class="card-text">{{ card.text }}</p>
      </div>
      <div class="card-footer text-muted">
        <label class="custom-control custom-checkbox mb-2 mr-sm-2 mb-sm-0">
          <input type="checkbox" class="custom-control-input"
                 [checked]="card.pinned"
                 (change)="updatePinned()">
          <span class="custom-control-indicator"></span>
          <span class="custom-control-description">{{ card.pinned === true ? 'Unpin?' : 'Pin?' }}</span>
        </label>
      </div>
    </div>
  `,
  styles: [`
    .card {
      margin-bottom: 1rem;
      position: relative;
      min-height: 5rem;
      box-shadow: 2px 2px 2px 0 rgba(0, 0, 0, 0.1);
    }
    .custom-control-description {
      display: none;
    }
    .custom-control:hover .custom-control-description {
      display: block;
    }
    .close {
      margin: -12px -21px 0 0;
      padding: 0 5px;
    }
  `],
})
export class CardComponent implements OnInit {
  @Input() card: ICard;
  @Output() 'onRemove' = new EventEmitter<ICard>();
  @Output() 'onPinnedToggle' = new EventEmitter<ICard>();
  @HostBinding('class') classes = 'col-3';
  public cardColor$: Observable<string>;

  constructor(private store: Store<fromRoot.State>) {
    this.cardColor$ = this.store.select(fromRoot.getToolbarColor);
  }

  ngOnInit() {
  }

  removeCard() {
    this.onRemove.emit(this.card);
  }

  updatePinned() {
    this.onPinnedToggle.emit(this.card);
  }
}
