import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BaseChartDirective } from 'ng2-charts';
import { ChartConfiguration, ChartData, ChartType } from 'chart.js';

import { ReportService } from '../../services/report.service';
import { FrequentCustomersReport } from '../../models/report.interface';
import { NotificationService } from '../../../../core/services/notification.service';

@Component({
  imports: [
    CommonModule,       
    FormsModule,        
    BaseChartDirective   
  ],
  selector: 'app-frequent-customers-report',
  templateUrl: './frequent-customers-report.component.html',
  styleUrls: ['./frequent-customers-report.component.css']
})
export class FrequentCustomersReportComponent implements OnInit {
  reportData: FrequentCustomersReport[] = [];
  loading = false;
  limit = 5;

  // Configuración del gráfico
  public chartOptions: ChartConfiguration['options'] = {
    responsive: true,
    scales: {
      x: {},
      y: {
        beginAtZero: true
      }
    },
    plugins: {
      legend: {
        display: true,
      },
      tooltip: {
        callbacks: {
          label: (context) => {
            return `$${context.raw}`;
          }
        }
      }
    }
  };

  public chartType: ChartType = 'bar';
  public chartData: ChartData<'bar'> = {
    labels: [],
    datasets: []
  };

  constructor(
    private reportService: ReportService,
    private notification: NotificationService
  ) {}

  ngOnInit(): void {
    this.loadReport();
  }

  loadReport(): void {
    this.loading = true;
    this.reportService.getFrequentCustomersReport(this.limit).subscribe({
      next: (data) => {
        this.reportData = data;
        this.prepareChartData();
        this.loading = false;
      },
      error: (err) => {
        this.notification.showError('Error al cargar el reporte');
        this.loading = false;
      }
    });
  }

  updateLimit(): void {
    this.loadReport();
  }

  prepareChartData(): void {
    this.chartData = {
      labels: this.reportData.map(item => item.user.name),
      datasets: [
        {
          data: this.reportData.map(item => item.totalSpent),
          label: 'Gasto Total',
          backgroundColor: 'rgba(75, 192, 192, 0.6)'
        },
        {
          data: this.reportData.map(item => item.orderCount),
          label: 'Número de Pedidos',
          backgroundColor: 'rgba(54, 162, 235, 0.6)'
        }
      ]
    };
  }

  getAverageOrders(): number {
    if (this.reportData.length === 0) return 0;
    return this.reportData.reduce((sum, item) => sum + item.orderCount, 0) / this.reportData.length;
  }

  exportToExcel(): void {
    this.reportService.exportReportToExcel('frequent-customers').subscribe({
      next: (blob) => {
        const a = document.createElement('a');
        const objectUrl = URL.createObjectURL(blob);
        a.href = objectUrl;
        a.download = 'clientes_frecuentes.xlsx';
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