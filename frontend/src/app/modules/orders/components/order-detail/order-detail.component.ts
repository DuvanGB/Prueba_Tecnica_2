import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Order } from '../../models/order.interface';
import { OrderService } from '../../services/order.service';
import { NotificationService } from '../../../../core/services/notification.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  imports: [
    CommonModule,   
    FormsModule
  ],
  selector: 'app-order-detail',
  templateUrl: './order-detail.component.html',
  styleUrls: ['./order-detail.component.css']
})
export class OrderDetailComponent implements OnInit {
  order!: Order;
  loading = false;

  constructor(
    private route: ActivatedRoute,
    private orderService: OrderService,
    private notification: NotificationService
  ) {}

  ngOnInit(): void {
    const orderId = this.route.snapshot.params['id'];
    this.loadOrder(orderId);
  }

  loadOrder(id: number): void {
    this.loading = true;
    this.orderService.getOrderById(id).subscribe({
      next: (order) => {
        this.order = order;
        this.loading = false;
      },
      error: (err) => {
        this.notification.showError('Error al cargar la orden');
        this.loading = false;
      }
    });
  }

  applyRandomDiscount(): void {
    this.orderService.applyDiscount(this.order.id, 'RANDOM').subscribe({
      next: (updatedOrder) => {
        this.order = updatedOrder;
        this.notification.showSuccess('Descuento aplicado correctamente');
      }
    });
  }

  getDiscountMessage(): string {
    if (this.order.isRandomDiscount) {
      return '50% de descuento (promoción aleatoria)';
    } else if (this.order.isTimeRangeDiscount) {
      return '10% de descuento (promoción por tiempo limitado)';
    } else if (this.order.discount > 0) {
      return `${this.order.discount}% de descuento (cliente frecuente)`;
    }
    return 'Sin descuento aplicado';
  }
}