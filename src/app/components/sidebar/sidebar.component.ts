import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  template: `
    <nav class="col-sm-3 col-md-2 hidden-xs-down bg-faded sidebar">
      <app-login></app-login>
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
  `,
  styles: [`
    .sidebar {
      padding-left: 0;
      padding-right: 0;
    }
    .sidebar {
      position: fixed;
      top: 50px;
      bottom: 0;
      left: 0;
      z-index: 1000;
      padding: 20px;
      overflow-x: hidden;
      overflow-y: auto;
      border-right: 1px solid #eee;
    }
  `]
})
export class SidebarComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
