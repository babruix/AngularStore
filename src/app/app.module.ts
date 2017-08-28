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
import { RouterModule, Routes } from '@angular/router';

// services
import { GlobalService } from './services/global.service';
import { AuthGuard } from './services/auth-guard.service';

// components
import { AppComponent } from './app.component';
import { LoginComponent } from 'app/components/login/login.component';
import { ProductComponent } from './components/product/product.component';
import { ProductListComponent } from './components/product-list/product-list.component';
import { NavComponent } from './components/nav/nav.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';

// admin
import { ColorInputComponent } from './components/color-input/color-input.component';
import { AdminComponent } from './components/admin/admin.component';
import { AdminProductsComponent } from './components/admin-products/admin-products.component';
import { NewProductInputComponent } from './components/new-product-input/new-product-input.component';
import { AdminUsersComponent } from './components/admin-users/admin-users.component';
import { NewUserInputComponent } from './components/new-user-input/new-user-input.component';

const appRoutes: Routes = [
  {path: '', component: ProductListComponent},
  {
    path: 'admin', component: AdminComponent, canActivate: [AuthGuard]
    , children: [
      {path: 'products', component: AdminProductsComponent},
      {path: 'edit-product/:key', component: NewProductInputComponent},
      {path: 'users', component: AdminUsersComponent}
    ]
  },
  {path: 'login', component: LoginComponent},
  {path: 'store', component: ProductListComponent},
  {path: '', redirectTo: '/store', pathMatch: 'full'},
  {path: '**', redirectTo: '/store', pathMatch: 'full'}
];

@NgModule({
  declarations: [
    AppComponent,
    ProductComponent,
    ProductListComponent,
    NewProductInputComponent,
    NewUserInputComponent,
    ColorInputComponent,
    LoginComponent,
    AnimateDirective,
    AdminComponent,
    AdminUsersComponent,
    AdminProductsComponent,
    NavComponent,
    SidebarComponent
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
    NgxAniModule,
    RouterModule.forRoot(
      appRoutes,
      // { enableTracing: true }
    ),
  ],
  providers: [GlobalService, AuthGuard, AnimateDirective],
  bootstrap: [AppComponent]
})
export class AppModule {
}
