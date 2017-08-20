import {Component, OnInit} from '@angular/core';
import {Store} from '@ngrx/store';
import * as fromRoot from '../reducers';
import * as ui from '../actions/ui';

@Component({
  selector: 'app-color-input',
  template: `
    <input [(colorPicker)]="color" 
           [style.background]="color"
           (colorPickerChange)="changeColor($event)"/>
  `,
  styles: []
})
export class ColorInputComponent implements OnInit {
  public color: string;

  changeColor(color: string) {
      this.store.dispatch(new ui.SetToolbarColorAction(color));
  }

  constructor(private store: Store<fromRoot.State>) {
  }

  ngOnInit() {
  }

}
