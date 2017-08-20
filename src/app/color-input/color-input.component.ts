import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import * as fromRoot from '../reducers';
import * as ui from '../actions/ui';

@Component({
  selector: 'app-color-input',
  template: `
    <input class="form-control"
           [(colorPicker)]="color"
           [style.background]="color"
           [value]="color"
           (colorPickerChange)="changeColor($event)"
           ngbTooltip="Choose interface color"/>
    <i class="fa fa-eyedropper" aria-hidden="true"></i>
  `,
  styles: [`
    input.form-control {
      width: 110px;
      padding-left: 28px;
      cursor: pointer;
    }

    .fa-eyedropper {
      float: left;
      padding: 0 7px;
      margin-top: -28px;
    }
  `]
})
export class ColorInputComponent implements OnInit {
  public color: string;

  changeColor(color: string) {
    this.store.dispatch(new ui.SetToolbarColorAction(color));
  }

  constructor(private store: Store<fromRoot.State>) {
  }

  ngOnInit() {
    this.store.select(fromRoot.getToolbarColor)
      .subscribe(s => {
        this.color = s;
      });
  }

}
