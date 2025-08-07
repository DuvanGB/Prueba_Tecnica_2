import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../../shared/shared.module';

import { OrderListComponent } from './components/order-list/order-list.component';
import { OrderDetailComponent } from './components/order-detail/order-detail.component';
import { OrderCreateComponent } from './components/order-create/order-create.component';

@NgModule({
  imports: [
    OrderListComponent,
    OrderDetailComponent,
    OrderCreateComponent,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    RouterModule.forChild([
      { path: '', component: OrderListComponent },
      { path: 'create', component: OrderCreateComponent },
      { path: ':id', component: OrderDetailComponent }
    ])
  ]
})
export class OrdersModule { }