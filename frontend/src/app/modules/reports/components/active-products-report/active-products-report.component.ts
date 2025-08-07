import { Component, OnInit } from '@angular/core';
import { ReportService } from '../../services/report.service';
import { ActiveProductsReport } from '../../models/report.interface';
import { NotificationService } from '../../../../core/services/notification.service';
import { CommonModule } from '@angular/common';

@Component({
  imports: [CommonModule],
  selector: 'app-active-products-report',
  templateUrl: './active-products-report.component.html',
  styleUrls: ['./active-products-report.component.css']
})
export class ActiveProductsReportComponent implements OnInit {
  reportData: ActiveProductsReport[] = [];
  loading = false;

  constructor(
    private reportService: ReportService,
    private notification: NotificationService
  ) {}

  ngOnInit(): void {
    this.loadReport();
  }

  loadReport(): void {
    this.loading = true;
    this.reportService.getActiveProductsReport().subscribe({
      next: (data) => {
        this.reportData = data;
        this.loading = false;
      },
      error: (err) => {
        this.notification.showError('Error al cargar el reporte');
        this.loading = false;
      }
    });
  }

  exportToExcel(): void {
    this.reportService.exportReportToExcel('active-products').subscribe({
      next: (blob) => {
        const a = document.createElement('a');
        const objectUrl = URL.createObjectURL(blob);
        a.href = objectUrl;
        a.download = 'productos_activos.xlsx';
        a.click();
        URL.revokeObjectURL(objectUrl);
        this.notification.showSuccess('Reporte exportado correctamente');
      },
      error: (err) => {
        this.notification.showError('Error al exportar el reporte');
      }
    });
  }
}