import { Component, ElementRef, EventEmitter, HostBinding, Input, OnInit, Output } from '@angular/core';
import { ICard } from '../models/ICard';
import { Observable } from 'rxjs/Observable';
import * as fromRoot from '../reducers';
import { Store } from '@ngrx/store';
import { AnimateDirective } from '../directives/animate.directive';

@Component({
  selector: 'app-card',
  template: `
    <div class="card" [ngStyle]="{'background-color': cardColor$ |async}">
      <div class="card-header text-right">
        <button type="button" class="close btn btn-outline-secondary"
                aria-label="Close" ngbTooltip="{{card.removed ? 'Revive' : 'Remove'}}"
                (click)="removeCard()">
          <i class="fa {{card.removed ? 'fa-undo' : 'fa-trash-o'}}" aria-hidden="true"></i>
        </button>
      </div>
      <div class="card-body text-center">
        <p class="card-text">{{ card.text }}</p>
      </div>
      <div class="card-footer text-muted">
        <label class="custom-control custom-checkbox mb-2 mr-sm-2 mb-sm-0" ngbTooltip="{{ card.pinned === true ? 'Unpin?' : 'Pin?' }}">
          <input type="checkbox" class="custom-control-input"
                 [checked]="card.pinned"
                 (change)="updatePinned()">
          <span class="custom-control-indicator"></span>
        </label>
      </div>
    </div>
  `,
  styles: [`
    .card {
      margin-top: 1rem;
      margin-bottom: 1rem;
      position: relative;
      min-height: 5rem;
      box-shadow: 2px 2px 2px 0 rgba(0, 0, 0, 0.1);
    }

    .close {
      margin: -12px -21px 0 0;
      padding: 0 5px;
    }

    .fa-undo:hover {
      animation: spin 1s infinite linear;
    }

    @keyframes spin {
      to {
        transform: rotateZ(-720deg)
      }
    }
  `],
})
export class CardComponent implements OnInit {
  @Input() card: ICard;
  @Output() 'onRemove' = new EventEmitter<ICard>();
  @Output() 'onPinnedToggle' = new EventEmitter<ICard>();
  @HostBinding('class') classes = 'col-3';
  public cardColor$: Observable<string>;

  constructor(private store: Store<fromRoot.State>
              , private cardElement: ElementRef
              , private animator: AnimateDirective) {
    this.cardColor$ = this.store.select(fromRoot.getToolbarColor);
  }

  ngOnInit() {
    this.store.select(fromRoot.getToolbarColor)
      .subscribe(color => {
        this.animator.animateColor(this.cardElement.nativeElement.querySelector('.card'), color);
      });
    this.animator.animationIn(this.cardElement);
  }

  removeCard() {
    this.animator.animationOut(this.cardElement, () => {
      this.onRemove.emit(this.card);
    });
  }

  updatePinned() {
    this.animator.animationOut(this.cardElement, () => {
      this.onPinnedToggle.emit(this.card);
    });
  }
}
