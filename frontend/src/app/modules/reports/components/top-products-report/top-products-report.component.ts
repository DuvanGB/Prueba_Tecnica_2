import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BaseChartDirective } from 'ng2-charts';
import { ChartConfiguration, ChartData, ChartType } from 'chart.js';

import { ReportService } from '../../services/report.service';
import { TopProductsReport } from '../../models/report.interface';
import { NotificationService } from '../../../../core/services/notification.service';

@Component({
  selector: 'app-top-products-report',
  standalone: true,
  imports: [
    CommonModule,       
    FormsModule,        
    BaseChartDirective   
  ],
  templateUrl: './top-products-report.component.html',
  styleUrls: ['./top-products-report.component.css']
})
export class TopProductsReportComponent implements OnInit {
  reportData: TopProductsReport[] = [];
  loading = false;
  limit = 5;

  // Propiedades del chart que faltaban
  public chartType: ChartType = 'bar';
  public chartData: ChartData<'bar'> = {
    labels: [],
    datasets: []
  };
  
  public chartOptions: ChartConfiguration<'bar'>['options'] = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
        position: 'top',
      },
      title: {
        display: true,
        text: 'Top Productos Más Vendidos'
      },
      tooltip: {
        callbacks: {
          label: (context) => {
            const label = context.dataset.label || '';
            const value = context.raw as number;
            
            if (label.includes('Ingresos')) {
              return `${label}: ${value.toLocaleString('es-CO', {
                style: 'currency',
                currency: 'COP'
              })}`;
            } else {
              return `${label}: ${value.toLocaleString()} unidades`;
            }
          }
        }
      }
    },
    scales: {
      x: {
        display: true,
        title: {
          display: true,
          text: 'Productos'
        }
      },
      y: {
        display: true,
        beginAtZero: true,
        title: {
          display: true,
          text: 'Cantidad'
        }
      }
    }
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
    this.reportService.getTopProductsReport(this.limit).subscribe({
      next: (data) => {
        this.reportData = data;
        this.prepareChartData(); // Actualizar datos del chart
        this.loading = false;
      },
      error: (err) => {
        this.notification.showError('Error al cargar el reporte');
        this.loading = false;
      }
    });
  }

  // Método para preparar los datos del chart
  prepareChartData(): void {
    if (!this.reportData || this.reportData.length === 0) {
      this.chartData = {
        labels: [],
        datasets: []
      };
      return;
    }

    const labels = this.reportData.map(item => {
      // Truncar nombres largos para mejor visualización
      return item.product.name.length > 20 
        ? item.product.name.substring(0, 20) + '...'
        : item.product.name;
    });

    this.chartData = {
      labels: labels,
      datasets: [
        {
          label: 'Unidades Vendidas',
          data: this.reportData.map(item => item.totalSold),
          backgroundColor: 'rgba(54, 162, 235, 0.6)',
          borderColor: 'rgba(54, 162, 235, 1)',
          borderWidth: 1,
          yAxisID: 'y'
        },
        {
          label: 'Ingresos Totales',
          data: this.reportData.map(item => item.totalRevenue),
          backgroundColor: 'rgba(75, 192, 192, 0.6)',
          borderColor: 'rgba(75, 192, 192, 1)',
          borderWidth: 1,
          yAxisID: 'y1'
        }
      ]
    };

    // Actualizar opciones del chart para manejar dos escalas Y
    this.chartOptions = {
      ...this.chartOptions,
      scales: {
        x: {
          display: true,
          title: {
            display: true,
            text: 'Productos'
          }
        },
        y: {
          type: 'linear',
          display: true,
          position: 'left',
          beginAtZero: true,
          title: {
            display: true,
            text: 'Unidades Vendidas'
          }
        },
        y1: {
          type: 'linear',
          display: true,
          position: 'right',
          beginAtZero: true,
          title: {
            display: true,
            text: 'Ingresos (COP)'
          },
          grid: {
            drawOnChartArea: false,
          },
          ticks: {
            callback: function(value) {
              return (value as number).toLocaleString('es-CO', {
                style: 'currency',
                currency: 'COP',
                minimumFractionDigits: 0
              });
            }
          }
        }
      }
    };
  }

  updateLimit(): void {
    this.loadReport();
  }

  exportToExcel(): void {
    this.reportService.exportReportToExcel('top-products').subscribe({
      next: (blob) => {
        const a = document.createElement('a');
        const objectUrl = URL.createObjectURL(blob);
        a.href = objectUrl;
        a.download = 'top_productos.xlsx';
        a.click();
        URL.revokeObjectURL(objectUrl);
        this.notification.showSuccess('Reporte exportado correctamente');
      },
      error: (err) => {
        this.notification.showError('Error al exportar el reporte');
      }
    });
  }

  // Método auxiliar para obtener estadísticas rápidas
  getTotalRevenue(): number {
    return this.reportData.reduce((total, item) => total + item.totalRevenue, 0);
  }

  getTotalUnitsSold(): number {
    return this.reportData.reduce((total, item) => total + item.totalSold, 0);
  }

  getAveragePrice(): number {
    if (this.reportData.length === 0) return 0;
    const totalPrice = this.reportData.reduce((total, item) => total + item.product.price, 0);
    return totalPrice / this.reportData.length;
  }

  getTopCount(): number {
    return Math.min(3, this.reportData.length);
  }

  getTopThreePercentage(): number {
    if (this.reportData.length === 0) return 0;
    const topThreeRevenue = this.reportData.slice(0, 3).reduce((sum, item) => sum + item.totalRevenue, 0);
    const totalRevenue = this.getTotalRevenue();
    return totalRevenue > 0 ? (topThreeRevenue / totalRevenue) * 100 : 0;
  }

  getProductPercentage(item: TopProductsReport): number {
    const totalRevenue = this.getTotalRevenue();
    return totalRevenue > 0 ? (item.totalRevenue / totalRevenue) * 100 : 0;
  }
}