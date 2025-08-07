import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../../shared/shared.module';

import { ProductListComponent } from './components/product-list/product-list.component';
import { ProductDetailComponent } from './components/product-detail/product-detail.component';
import { ProductFormComponent } from './components/product-form/product-form.component';
import { ProductSearchComponent } from './components/product-search/product-search.component';

@NgModule({
  imports: [
    ProductListComponent,
    ProductDetailComponent,
    ProductFormComponent,
    ProductSearchComponent,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    RouterModule.forChild([
      { path: '', component: ProductListComponent },
      { path: 'create', component: ProductFormComponent },
      { path: 'edit/:id', component: ProductFormComponent },
      { path: ':id', component: ProductDetailComponent }
    ])
  ],
  exports: [
    ProductSearchComponent
  ]
})
export class ProductsModule { }