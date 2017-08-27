import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { CardComponent } from './card/card.component';
import { CardListComponent } from './card-list/card-list.component';
import { NewCardInputComponent } from './new-card-input/new-card-input.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import { reducer } from './reducers/index';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ColorInputComponent } from './color-input/color-input.component';
import { ColorPickerModule } from 'ngx-color-picker';
import { NgxAniModule } from 'ngxani';
import { AnimateDirective } from './directives/animate.directive';
import { ProductComponent } from './product/product.component';
import { ProductListComponent } from './product-list/product-list.component';
import { NewProductInputComponent } from './new-product-input/new-product-input.component';

@NgModule({
  declarations: [
    AppComponent,
    CardComponent,
    ProductComponent,
    ProductListComponent,
    CardListComponent,
    NewCardInputComponent,
    NewProductInputComponent,
    ColorInputComponent,
    AnimateDirective
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    StoreModule.provideStore(reducer),
    ColorPickerModule,
    NgbModule.forRoot(),
    NgxAniModule
  ],
  providers: [AnimateDirective],
  bootstrap: [AppComponent]
})
export class AppModule {
}
