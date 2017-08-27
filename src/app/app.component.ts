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
        <i class="fa fa-2x fa-id-product-o" aria-hidden="true"></i>
        Angular Store: Toptal Academy evaluation project
      </a>
      <ul class="nav navbar-nav" routerLinkActive="active">
        <li class="nav-item"><a class="nav-link" routerLink="login">Login</a></li>
        <li class="nav-item"><a class="nav-link" routerLink="admin">Add Product</a></li>
        <li class="nav-item"><a class="nav-link" routerLink="admin/users">Manage Users</a></li>
        <li class="nav-item"><a class="nav-link" routerLink="store">Store</a></li>
      </ul>
    </nav>

    <router-outlet></router-outlet>
  `,
  styles: [],
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
