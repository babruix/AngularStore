import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import { reducer } from './reducers/index';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ColorPickerModule } from 'ngx-color-picker';
import { NgxAniModule } from 'ngxani';
import { AnimateDirective } from './directives/animate.directive';
import { AngularFireModule } from 'angularfire2';
import { environment } from '../environments/environment';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { HttpModule } from '@angular/http';

// services
import { GlobalService } from './services/global.service';
import { AuthGuard } from './services/auth-guard.service';

// components
import { AppComponent } from './app.component';
import { LoginComponent } from 'app/components/login/login.component';
import { NewProductInputComponent } from './components/new-product-input/new-product-input.component';
import { ColorInputComponent } from './components/color-input/color-input.component';
import { ProductComponent } from './components/product/product.component';
import { ProductListComponent } from './components/product-list/product-list.component';

@NgModule({
  declarations: [
    AppComponent,
    ProductComponent,
    ProductListComponent,
    NewProductInputComponent,
    ColorInputComponent,
    LoginComponent,
    AnimateDirective
  ],
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    ReactiveFormsModule,
    StoreModule.provideStore(reducer),
    ColorPickerModule,
    NgbModule.forRoot(),
    NgxAniModule
  ],
  providers: [GlobalService, AuthGuard, AnimateDirective],
  bootstrap: [AppComponent]
})
export class AppModule {
}
