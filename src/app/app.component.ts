import { Component, ElementRef, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';
import * as fromRoot from './reducers';
import { AnimateDirective } from './directives/animate.directive';

@Component({
  selector: 'app-root',
  template: `
    <nav class="navbar navbar-toggleable-md navbar-inverse fixed-top bg-inverse"
         [ngStyle]="{'background-color': toolbarColor$ |async}">
      <button class="navbar-toggler navbar-toggler-right hidden-lg-up" type="button" data-toggle="collapse">
        <span class="navbar-toggler-icon"></span>
      </button>
      <a class="navbar-brand" href="#">
        <i class="fa fa-2x fa-id-product-o" aria-hidden="true"></i>
        Angular Store: Toptal Academy evaluation project
      </a>
      <div class="collapse navbar-collapse" id="navbarsExampleDefault">
        <ul class="navbar-nav mr-auto">
          <li class="nav-item active">
            <a class="nav-link" routerLink="login">Home <span class="sr-only">Login</span></a>
          </li>
        </ul>
      </div>
    </nav>
    <div class="container-fluid">
      <div class="row">
        <nav class="col-sm-3 col-md-2 hidden-xs-down bg-faded sidebar">
          <ul class="nav nav-pills flex-column">
            <li class="nav-item">
              <a class="nav-link" routerLink="store">Store</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" routerLink="add-product">Add Product</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" routerLink="users">Users</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" routerLink="add-user">Add User</a>
            </li>
          </ul>
        </nav>
        <main class="col-sm-9 offset-sm-3 col-md-10 offset-md-2 pt-3">
          <router-outlet></router-outlet>
        </main>
      </div>
    </div>
  `,
  styles: [`
    .sidebar {
      padding-left: 0;
      padding-right: 0;
    }
    .sidebar {
      position: fixed;
      top: 51px;
      bottom: 0;
      left: 0;
      z-index: 1000;
      padding: 20px;
      overflow-x: hidden;
      overflow-y: auto;
      border-right: 1px solid #eee;
    }
  `],
})
export class AppComponent implements OnInit {
  public toolbarColor$: Observable<string>;

  constructor(private store: Store<fromRoot.State>
    , private element: ElementRef
    , private animator: AnimateDirective) {
    this.toolbarColor$ = this.store.select(fromRoot.getToolbarColor);
  }

  ngOnInit() {
    this.store.select(fromRoot.getToolbarColor)
      .subscribe(color => {
        this.animator
          .animateColor(this.element.nativeElement.querySelector('nav'), color);
      });
  }
}
