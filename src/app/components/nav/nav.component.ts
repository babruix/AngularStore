import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-nav',
  template: `
    <nav class="navbar navbar-toggleable-md navbar-inverse fixed-top bg-inverse"
         [ngStyle]="{'background-color': toolbarColor$ |async}">
      <div class="container-fluid">
        <div class="row">
          <a class="navbar-brand" href="#">
            <i class="fa fa-2x fa-id-product-o" aria-hidden="true"></i>
            Angular Store: Toptal Academy evaluation project
          </a>
        </div>
      </div>
    </nav>
  `,
  styles: []
})
export class NavComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
