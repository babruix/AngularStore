import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin',
  template: `    
    <app-new-product-input></app-new-product-input>
  `,
  styles: []
})
export class AdminComponent implements OnInit {

  constructor() { }

  ngOnInit() {

  }

}
