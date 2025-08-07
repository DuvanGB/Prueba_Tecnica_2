import { Injectable } from '@angular/core';
import { ApiService } from '../../../core/services/api.service';
import { Observable } from 'rxjs';
import { Order } from '../models/order.interface';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  constructor(private api: ApiService) {}

  getOrders(): Observable<Order[]> {
    return this.api.get<Order[]>('orders');
  }

  getOrderById(id: number): Observable<Order> {
    return this.api.get<Order>(`orders/${id}`);
  }

  createOrder(orderData: any): Observable<Order> {
    return this.api.post<Order>('orders', orderData);
  }

  updateOrderStatus(id: number, status: string): Observable<Order> {
    return this.api.patch<Order>(`orders/${id}/status`, { status });
  }

  applyDiscount(orderId: number, discountType: string): Observable<Order> {
    return this.api.patch<Order>(`orders/${orderId}/discount`, { type: discountType });
  }

  getOrdersByUser(userId: number): Observable<Order[]> {
    return this.api.get<Order[]>(`users/${userId}/orders`);
  }
}