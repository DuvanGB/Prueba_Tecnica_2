import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { OrderService } from '../../services/order.service';
import { ProductService } from '../../../products/services/product.service';
import { Product } from '../../../products/models/product.interface';
import { NotificationService } from '../../../../core/services/notification.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  imports: [
    CommonModule,   
    FormsModule,
    ReactiveFormsModule
  ],
  selector: 'app-order-create',
  templateUrl: './order-create.component.html',
  styleUrls: ['./order-create.component.css']
})
export class OrderCreateComponent implements OnInit {
  orderForm: FormGroup;
  products: Product[] = [];
  selectedProducts: {product: Product, quantity: number}[] = [];
  loading = false;

  constructor(
    private fb: FormBuilder,
    private orderService: OrderService,
    private productService: ProductService,
    private notification: NotificationService,
    private router: Router
  ) {
    this.orderForm = this.fb.group({
      productId: ['', Validators.required],
      quantity: [1, [Validators.required, Validators.min(1)]]
    });
  }

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts(): void {
    this.loading = true;
    this.productService.getProducts().subscribe({
      next: (products) => {
        this.products = products;
        this.loading = false;
      },
      error: (err) => {
        this.notification.showError('Error al cargar productos');
        this.loading = false;
      }
    });
  }

  addProduct(): void {
    if (this.orderForm.valid) {
      const productId = this.orderForm.value.productId;
      const quantity = this.orderForm.value.quantity;
      const product = this.products.find(p => p.id == productId);

      if (product) {
        const existingItem = this.selectedProducts.find(item => item.product.id === product.id);
        
        if (existingItem) {
          existingItem.quantity += quantity;
        } else {
          this.selectedProducts.push({ product, quantity });
        }

        this.orderForm.reset({ quantity: 1 });
      }
    }
  }

  removeProduct(index: number): void {
    this.selectedProducts.splice(index, 1);
  }

  calculateTotal(): number {
    return this.selectedProducts.reduce(
      (total, item) => total + (item.product.price * item.quantity), 0
    );
  }

  submitOrder(): void {
    if (this.selectedProducts.length === 0) {
      this.notification.showWarning('Debes agregar al menos un producto');
      return;
    }

    const orderData = {
      items: this.selectedProducts.map(item => ({
        productId: item.product.id,
        quantity: item.quantity,
        price: item.product.price
      }))
    };

    this.loading = true;
    this.orderService.createOrder(orderData).subscribe({
      next: (order) => {
        this.notification.showSuccess('Orden creada correctamente');
        this.router.navigate(['/orders', order.id]);
      },
      error: (err) => {
        this.notification.showError('Error al crear la orden');
        this.loading = false;
      }
    });
  }
}