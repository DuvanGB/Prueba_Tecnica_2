import { Component, OnInit } from '@angular/core';
import { Order } from '../../models/order.interface';
import { OrderService } from '../../services/order.service';
import { NotificationService } from '../../../../core/services/notification.service';
import { OrderStatus } from '../../models/order-status.enum';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  imports: [
    CommonModule,   
    FormsModule,
    RouterModule
  ],
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.css']
})
export class OrderListComponent implements OnInit {
  orders: Order[] = [];
  loading = false;
  statusFilter = '';

  constructor(
    private orderService: OrderService,
    private notification: NotificationService
  ) {}

  ngOnInit(): void {
    this.loadOrders();
  }

  loadOrders(): void {
    this.loading = true;
    this.orderService.getOrders().subscribe({
      next: (orders) => {
        this.orders = orders;
        this.loading = false;
      },
      error: (err) => {
        this.notification.showError('Error al cargar las órdenes');
        this.loading = false;
      }
    });
  }

  applyFilter(): Order[] {
    if (!this.statusFilter) return this.orders;
    return this.orders.filter(order => 
      order.status.toLowerCase() === this.statusFilter.toLowerCase()
    );
  }

  cancelOrder(orderId: number ): void {
    if (confirm('¿Estás seguro de cancelar esta orden?')) {
      this.orderService.updateOrderStatus(orderId, OrderStatus.CANCELLED).subscribe({
        next: (updatedOrder) => {
          const index = this.orders.findIndex(o => o.id === orderId);
          if (index !== -1) {
            this.orders[index] = updatedOrder;
          }
          this.notification.showSuccess('Orden cancelada correctamente');
        }
      });
    }
  }
}