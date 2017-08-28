import { Component, ElementRef, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';
import * as fromRoot from './reducers';
import { AnimateDirective } from './directives/animate.directive';

@Component({
  selector: 'app-root',
  template: `
    <app-nav></app-nav>
    <div class="container">
      <div class="row">
        <div class="col-3 offset-6">
          <div class="btn-group" data-toggle="buttons">
            <label class="btn btn-link">
              <input type="checkbox" [(ngModel)]="hideCart">Shopping Cart
            </label>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-md-3 offset-md-6">
          <app-user-cart [ngbCollapse]="hideCart"></app-user-cart>
        </div>
      </div>
    </div>

    <div class="container-fluid">
      <div class="row">
        <app-sidebar></app-sidebar>
        <main class="col-sm-9 offset-sm-3 col-md-10 offset-md-2 pt-3">
          <router-outlet></router-outlet>
        </main>
      </div>
    </div>

  `,
  styles: [`
   
  `],
})
export class AppComponent implements OnInit {
  public toolbarColor$: Observable<string>;
  hideCart: boolean;

  constructor(private store: Store<fromRoot.State>
    , private element: ElementRef
    , private animator: AnimateDirective) {
    this.toolbarColor$ = this.store.select(fromRoot.getToolbarColor);
    this.hideCart = true;
  }

  ngOnInit() {

    this.store.select(fromRoot.getToolbarColor)
      .subscribe(color => {
        this.animator
          .animateColor(this.element.nativeElement.querySelector('nav'), color);
      });
  }
}
