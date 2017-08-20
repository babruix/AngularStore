import {Component} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {Store} from '@ngrx/store';
import * as fromRoot from './reducers';

@Component({
  selector: 'app-root',
  template: `
    <!-- Fixed navbar -->
    <nav class="navbar fixed-top"
         [ngStyle]="{'background-color': toolbarColor$ |async}">
      <a class="navbar-brand" href="#">CPinner: Cards Pinner</a>
    </nav>
    <app-new-card-input></app-new-card-input>
    <app-card-list></app-card-list>
  `,
  styles: [],
})
export class AppComponent {
  public toolbarColor$: Observable<string>;

  constructor(private store: Store<fromRoot.State>) {
    this.toolbarColor$ = this.store.select(fromRoot.getToolbarColor);
  }
}
