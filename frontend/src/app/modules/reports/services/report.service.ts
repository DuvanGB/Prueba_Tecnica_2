import { Injectable } from '@angular/core';
import { ApiService } from '../../../core/services/api.service';
import { Observable } from 'rxjs';
import { 
  ActiveProductsReport, 
  TopProductsReport, 
  FrequentCustomersReport 
} from '../models/report.interface';

@Injectable({
  providedIn: 'root'
})
export class ReportService {
  constructor(private api: ApiService) {}

  getActiveProductsReport(): Observable<ActiveProductsReport[]> {
    return this.api.get<ActiveProductsReport[]>('reports/active-products');
  }

  getTopProductsReport(limit: number = 5): Observable<TopProductsReport[]> {
    return this.api.get<TopProductsReport[]>(`reports/top-products?limit=${limit}`);
  }

  getFrequentCustomersReport(limit: number = 5): Observable<FrequentCustomersReport[]> {
    return this.api.get<FrequentCustomersReport[]>(`reports/frequent-customers?limit=${limit}`);
  }

  exportReportToExcel(reportType: string): Observable<Blob> {
    return this.api.get(`reports/export/${reportType}`, { responseType: 'blob' });
  }
}