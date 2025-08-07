import { Component, OnInit } from '@angular/core';
import { ReportService } from '../../modules/reports/services/report.service';
import { ProductService } from '../../modules/products/services/product.service';
import { OrderService } from '../../modules/orders/services/order.service';
import { TopProductsReport } from '../../modules/reports/models/report.interface';
import { LoadingSpinnerComponent } from '../../shared/components/loading-spinner/loading-spinner.component';
import { CommonModule } from '@angular/common'; 

@Component({
  imports: [CommonModule, LoadingSpinnerComponent],
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  topProducts: TopProductsReport[] = [];
  activeProductsCount = 0;
  pendingOrdersCount = 0;
  loading = false;

  constructor(
    private reportService: ReportService,
    private productService: ProductService,
    private orderService: OrderService
  ) {}

  ngOnInit(): void {
    this.loadDashboardData();
  }

  loadDashboardData(): void {
    this.loading = true;
    
    this.reportService.getTopProductsReport(5).subscribe({
      next: (products) => {
        this.topProducts = products;
      }
    });

    this.productService.getActiveProducts().subscribe({
      next: (products) => {
        this.activeProductsCount = products.length;
      }
    });

    this.orderService.getOrders().subscribe({
      next: (orders) => {
        this.pendingOrdersCount = orders.filter(o => o.status === 'PENDING').length;
        this.loading = false;
      },
      error: () => {
        this.loading = false;
      }
    });
  }
}