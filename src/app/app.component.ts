import { Component, ElementRef, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';
import * as fromRoot from './reducers';
import { AnimateDirective } from './directives/animate.directive';

@Component({
  selector: 'app-root',
  template: `
    <nav class="navbar fixed-top"
         [ngStyle]="{'background-color': toolbarColor$ |async}">
      <a class="navbar-brand" href="#">
        <i class="fa fa-2x fa-id-card-o" aria-hidden="true"></i>
        CPinner: Cards Pinner
      </a>
    </nav>
    <app-new-card-input></app-new-card-input>
    <app-card-list></app-card-list>
  `,
  styles: [],
})
export class AppComponent implements OnInit {
  public toolbarColor$: Observable<string>;

  constructor(private store: Store<fromRoot.State>
              , private element: ElementRef
              , private animate: AnimateDirective) {
    this.toolbarColor$ = this.store.select(fromRoot.getToolbarColor);
  }

  ngOnInit() {
    this.store.select(fromRoot.getToolbarColor)
      .subscribe(color => {
        this.animate
          .animateColor(this.element.nativeElement.querySelector('nav'), color);
      });
  }
}
