import {Component, OnInit} from '@angular/core';
import { Store} from '@ngrx/store';
import * as fromRoot from '../reducers';
import * as ui from '../actions/ui';

@Component({
  selector: 'app-color-input',
  template: `
    <label>Choose color:</label>
    <input class="form-control"
           [(colorPicker)]="color"
           [style.background]="color"
           [value]="color"
           (colorPickerChange)="changeColor($event)"/>
  `,
  styles: [`
    input.form-control {
      width: 100px;
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
