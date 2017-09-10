import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './services/auth-guard.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxAniModule } from 'ngxani';
import { ColorPickerModule } from 'ngx-color-picker';

import { AdminComponent } from './components/admin/admin.component';
import { AdminProductsComponent } from './components/admin-products/admin-products.component';
import { NewProductInputComponent } from './components/new-product-input/new-product-input.component';
import { AdminUsersComponent } from './components/admin-users/admin-users.component';
import { NewUserInputComponent } from './components/new-user-input/new-user-input.component';
import { AdminOrdersComponent } from './components/admin-orders/admin-orders.component';
import { ColorInputComponent } from './components/color-input/color-input.component';
import { OrderModule } from './order.module';


const routes: Routes = [
  {path: '', component: AdminComponent, canActivate: [AuthGuard]
    , children: [
    {path: 'products', component: AdminProductsComponent},
    {path: 'edit-product/:key', component: NewProductInputComponent},
    {path: 'users', component: AdminUsersComponent},
    {path: 'edit-user/:key', component: NewUserInputComponent},
    {path: 'orders', component: AdminOrdersComponent},
  ]
  },
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    ReactiveFormsModule,
    NgbModule.forRoot(),
    NgxAniModule,
    ColorPickerModule,
    OrderModule,
  ],
  declarations: [
    AdminComponent,
    AdminProductsComponent,
    NewProductInputComponent,
    AdminUsersComponent,
    NewUserInputComponent,
    AdminOrdersComponent,
    ColorInputComponent,
  ]
})
export class AdminModule { }
