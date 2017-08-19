import {Component, OnDestroy, OnInit} from '@angular/core';
import {ICard} from '../models/ICard';
import 'rxjs/add/operator/map';
import {Store} from '@ngrx/store';
import {Observable} from 'rxjs/Observable';
import * as fromRoot from '../reducers';
import 'rxjs/add/operator/takeWhile';
import * as cardActions from '../actions/card-actions';

@Component({
  selector: 'app-card-list',
  template: `
    <div class="container-fluid text-center pb-5" *ngIf="anyPinned$ | async">
      <div class="row"><p class="h6 col-2">Pinned</p></div>
      <div class="row">
        <app-card *ngFor="let card of getPinned() | async" [card]="card" (onRemove)="removeCard($event)"></app-card>
      </div>
    </div>
    <div class="container-fluid text-center pb-5">
      <div class="row">
        <p class="h6 col-2" *ngIf="anyPinned$ | async">Others</p>
      </div>
      <div class="row">
        <app-card *ngFor="let card of getPinned(false) | async" [card]="card" (onRemove)="removeCard($event)"></app-card>
      </div>
    </div>
  `,
  styles: []
})
export class CardListComponent implements OnInit, OnDestroy {
  public cards: Array<ICard> = [];
  public anyPinned$: Observable<boolean>;
  private alive = true;

  constructor(private store: Store<fromRoot.State>) {
    this.anyPinned$ = this.getPinned()
      .takeWhile(() => this.alive)
      .map((cards) => cards.length > 0);

    this.store
      .select(fromRoot.getCards)
      .takeWhile(() => this.alive)
      .subscribe(state => {
        this.cards = state
      });
  }

  ngOnInit() {
  }
  ngOnDestroy(): void {
    this.alive = false;
  }

  getPinned(pinned = true) {
    return this.store.select(fromRoot.getCards)
      .takeWhile(() => this.alive)
      .map((cardArr) => cardArr.filter(card => pinned
        ? card.pinned === true
        : card.pinned !== true));
  }

  removeCard(card) {
    this.store.dispatch(new cardActions.RemoveAction(card));
  }
}
