import {Component} from '@angular/core';
import {ICard} from './models/ICard';

@Component({
  selector: 'app-root',
  template: `
    <!-- Fixed navbar -->
    <nav class="navbar navbar-toggleable-md navbar-inverse bg-inverse fixed-top">
      <a class="navbar-brand" href="#">CPinner: Cards Pinner</a>
    </nav>
    <div class="container-fluid text-center pb-5">
      <div class="row justify-content-end">
        <app-new-card-input></app-new-card-input>
      </div>
    </div>
    <app-card-list></app-card-list>
  `,
  styles: [],
})
export class AppComponent {
}
