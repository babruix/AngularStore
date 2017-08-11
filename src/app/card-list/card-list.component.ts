import {Component, Input, OnInit} from '@angular/core';
import {filter} from 'lodash';
import {ICard} from '../models/ICard';

@Component({
  selector: 'app-card-list',
  template: `
    <div class="container-fluid text-center pb-5" *ngIf="anyPinned()">
      <div class="row"><p class="h6 col-2">Pinned</p></div>
      <div class="row">
        <app-card *ngFor="let card of getPinned(cards)" [card]="card"></app-card>
      </div>
    </div>
    <div class="container-fluid text-center pb-5">
      <div class="row">
        <p class="h6 col-2" *ngIf="anyPinned()">Others</p>
      </div>
      <div class="row">
        <app-card *ngFor="let card of getPinned(cards, false)" [card]="card"></app-card>
      </div>
    </div>
  `,
  styles: []
})
export class CardListComponent implements OnInit {
  @Input() cards: Array<ICard>;

  constructor() {
  }

  ngOnInit() {
  }

  getPinned(cards, pinned = true) {
    return filter(cards, (card: ICard) => {
      return pinned ? card.pinned === true : card.pinned === false;
    });
  }

  anyPinned() {
    return this.getPinned(this.cards).length > 0;
  }
}
