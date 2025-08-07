import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../../shared/shared.module';
import { BaseChartDirective } from 'ng2-charts';

import { ActiveProductsReportComponent } from './components/active-products-report/active-products-report.component';
import { TopProductsReportComponent } from './components/top-products-report/top-products-report.component';
import { FrequentCustomersReportComponent } from './components/frequent-customers-report/frequent-customers-report.component';

@NgModule({
  imports: [
    ActiveProductsReportComponent,
    TopProductsReportComponent,
    FrequentCustomersReportComponent,
    CommonModule,
    SharedModule,
    BaseChartDirective,
    RouterModule.forChild([
      { path: 'active-products', component: ActiveProductsReportComponent },
      { path: 'top-products', component: TopProductsReportComponent },
      { path: 'frequent-customers', component: FrequentCustomersReportComponent },
      { path: '', redirectTo: 'active-products', pathMatch: 'full' }
    ])
  ]
})
export class ReportsModule { }