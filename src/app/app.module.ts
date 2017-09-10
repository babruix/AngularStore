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
import { RecaptchaModule } from 'ng-recaptcha';

// services
import { GlobalService } from './services/global.service';
import { AuthGuard } from './services/auth-guard.service';
import { PaymentService } from './services/payment.service';

// components
import { AppComponent } from './app.component';
import { LoginComponent } from 'app/components/login/login.component';
import { ProductComponent } from './components/product/product.component';
import { ProductListComponent } from './components/product-list/product-list.component';
import { NavComponent } from './components/nav/nav.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { UserCartComponent } from './components/user-cart/user-cart.component';
import { CheckoutShippingComponent } from './components/checkout-shipping/checkout-shipping.component';
import { CheckoutBillingComponent } from './components/checkout-billing/checkout-billing.component';
import { UserOrdersComponent } from './components/user-orders/user-orders.component';

// admin
import { CheckoutPaymentComponent } from './components/checkout-payment/checkout-payment.component';
import { ColorInputComponent } from './components/color-input/color-input.component';
import { AdminComponent } from './components/admin/admin.component';
import { AdminProductsComponent } from './components/admin-products/admin-products.component';
import { NewProductInputComponent } from './components/new-product-input/new-product-input.component';
import { AdminUsersComponent } from './components/admin-users/admin-users.component';
import { NewUserInputComponent } from './components/new-user-input/new-user-input.component';
import { AdminOrdersComponent } from './components/admin-orders/admin-orders.component';
import { UserRegisterComponent } from './components/user-register/user-register.component';


const appRoutes: Routes = [
  {path: '', component: ProductListComponent},
  {path: 'admin', component: AdminComponent, canActivate: [AuthGuard]
    , children: [
      {path: 'products', component: AdminProductsComponent},
      {path: 'edit-product/:key', component: NewProductInputComponent},
      {path: 'users', component: AdminUsersComponent},
      {path: 'edit-user/:key', component: NewUserInputComponent},
      {path: 'orders', component: AdminOrdersComponent},
    ]
  },
  {path: 'checkout'
    , children: [
      {path: '',
        children: [
          {path: 'shipping', component: CheckoutShippingComponent},
          {path: 'billing', component: CheckoutBillingComponent},
          {path: 'payment', component: CheckoutPaymentComponent},
        ]
      }
    ]
  },
  {path: 'login', component: LoginComponent},
  {path: 'register', component: UserRegisterComponent},
  {path: 'orders', component: UserOrdersComponent},
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
    SidebarComponent,
    UserCartComponent,
    CheckoutShippingComponent,
    CheckoutBillingComponent,
    CheckoutPaymentComponent,
    AdminOrdersComponent,
    UserOrdersComponent,
    UserRegisterComponent,
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
    RecaptchaModule.forRoot(), // Keep in mind the "forRoot"-magic nuances!
  ],
  providers: [GlobalService, AuthGuard, AnimateDirective, PaymentService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
