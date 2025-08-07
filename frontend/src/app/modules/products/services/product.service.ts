import { Injectable } from '@angular/core';
import { ApiService } from '../../../core/services/api.service';
import { Observable } from 'rxjs';
import { Product } from '../models/product.interface';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  constructor(private api: ApiService) {}

  getProducts(): Observable<Product[]> {
    return this.api.get<Product[]>('products');
  }

  getActiveProducts(): Observable<Product[]> {
    return this.api.get<Product[]>('products/active');
  }

  getProductById(id: number): Observable<Product> {
    return this.api.get<Product>(`products/${id}`);
  }

  createProduct(product: Product): Observable<Product> {
    return this.api.post<Product>('products', product);
  }

  updateProduct(id: number, product: Product): Observable<Product> {
    return this.api.put<Product>(`products/${id}`, product);
  }

  deleteProduct(id: number): Observable<void> {
    return this.api.delete<void>(`products/${id}`);
  }

  searchProducts(term: string): Observable<Product[]> {
    return this.api.get<Product[]>('products/search', { q: term });
  }

  getTopSellingProducts(limit: number = 5): Observable<Product[]> {
    return this.api.get<Product[]>(`products/top-selling?limit=${limit}`);
  }
}