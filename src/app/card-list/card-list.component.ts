import { Component, OnDestroy, OnInit } from '@angular/core';
import 'rxjs/add/operator/map';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import * as fromRoot from '../reducers';
import 'rxjs/add/operator/takeWhile';
import * as cardActions from '../actions/card';

@Component({
  selector: 'app-card-list',
  template: `
    <div class="container-fluid">
      <ngb-tabset>
        <ngb-tab title="Pinned" *ngIf="anyPinned$ | async">
          <ng-template ngbTabContent>
            <div class="row card-columns">
              <app-card *ngFor="let card of getPinned() | async"
                        [card]="card"
                        (onRemove)="removeCard($event)"
                        (onPinnedToggle)="togglePinned($event)"></app-card>
            </div>
          </ng-template>
        </ngb-tab>
        <ngb-tab title="Others" *ngIf="anyNotPinned$ | async">
          <ng-template ngbTabContent>
            <div class="row card-columns">
              <app-card *ngFor="let card of getPinned(false) | async"
                        [card]="card"
                        (onRemove)="removeCard($event)"
                        (onPinnedToggle)="togglePinned($event)"></app-card>
            </div>
          </ng-template>
        </ngb-tab>
        <ngb-tab title="Removed" *ngIf="anyRemoved$ | async">
          <ng-template ngbTabContent>
            <div class="row card-columns">
              <app-card *ngFor="let card of getRemoved() | async"
                        [card]="card"
                        (onRemove)="removeCard($event)"
                        (onPinnedToggle)="togglePinned($event)"></app-card>
            </div>
          </ng-template>
        </ngb-tab>
      </ngb-tabset>
    </div>
  `,
  styles: [`

  `]
})
export class CardListComponent implements OnInit, OnDestroy {
  public anyPinned$: Observable<boolean>;
  public anyNotPinned$: Observable<boolean>;
  public anyRemoved$: Observable<boolean>;
  private alive = true;

  constructor(private store: Store<fromRoot.State>) {
    this.anyPinned$ = this.getPinned()
      .takeWhile(() => this.alive)
      .map((cards) => cards.length > 0);

    this.anyNotPinned$ = this.getPinned(false)
      .takeWhile(() => this.alive)
      .map((cards) => cards.length > 0);

    this.anyRemoved$ = this.getRemoved()
      .takeWhile(() => this.alive)
      .map((cards) => cards.length > 0);

    this.store
      .select(fromRoot.getCards)
      .takeWhile(() => this.alive)
      .map(cards => cards.length > 0);
  }

  ngOnInit() {
  }

  ngOnDestroy(): void {
    this.alive = false;
  }

  getPinned(pinned = true) {
    return this.store.select(fromRoot.getCards)
      .takeWhile(() => this.alive)
      .map((cardArr) => cardArr
        .filter(card => pinned
          ? card.pinned === true
          : card.pinned !== true)
        .filter(card => card.removed !== true));
  }

  removeCard(card) {
    this.store.dispatch(new cardActions.RemoveAction(card));
  }

  togglePinned(card) {
    this.store.dispatch(new cardActions.TogglePinnedAction(card));
  }

  getRemoved() {
    return this.store.select(fromRoot.getCards)
      .takeWhile(() => this.alive)
      .map((cardArr) => cardArr
        .filter(card => card.removed === true));
  }
}
