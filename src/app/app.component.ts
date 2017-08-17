import {Component} from '@angular/core';
import {ICard} from './models/ICard';

@Component({
  selector: 'app-root',
  template: `
    <!-- Fixed navbar -->
    <nav class="navbar navbar-toggleable-md navbar-inverse bg-inverse fixed-top">
      <a class="navbar-brand" href="#">CPINNER: Cards Pinner</a>
    </nav>
    <div class="container-fluid text-center pb-5">
      <div class="row justify-content-end">
        <app-new-card-input (onCardAdd)="addCard($event)"></app-new-card-input>
      </div>
    </div>
    <app-card-list [cards]="cards"></app-card-list>
  `,
  styles: [],
})
export class AppComponent {
  public cards: Array<ICard> = [
    {text: 'Card 1', pinned: false},
    {text: 'Card 2', pinned: false},
    {text: 'Card 3', pinned: false},
    {text: 'Card 4', pinned: false},
    {text: 'Card 5', pinned: false},
    {text: 'Card 6', pinned: false},
    {text: 'Card 7', pinned: false},
    {text: 'Card 8', pinned: false},
    {text: 'Card 9', pinned: false},
    {text: 'Card 10', pinned: false},
  ];

  addCard(cardText) {
    this.cards.push({text: cardText, pinned: false});
  }
}
