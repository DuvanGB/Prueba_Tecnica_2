import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../../models/product.interface';
import { ProductService } from '../../services/product.service';
import { NotificationService } from '../../../../core/services/notification.service';
import { ProductCategory } from '../../models/product-category.enum';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  imports: [
    CommonModule,   
    FormsModule,
    RouterModule
  ],
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {
  product!: Product;
  loading = false;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private notification: NotificationService
  ) {}

  ngOnInit(): void {
    const productId = this.route.snapshot.params['id'];
    this.loadProduct(productId);
  }

  loadProduct(id: number): void {
    this.loading = true;
    this.productService.getProductById(id).subscribe({
      next: (product) => {
        this.product = product;
        this.loading = false;
      },
      error: (err) => {
        this.notification.showError('Error al cargar el producto');
        this.loading = false;
      }
    });
  }

  toggleStatus(): void {
    const newStatus = !this.product.active;
    this.productService.updateProduct(this.product.id, {
      ...this.product,
      active: newStatus
    }).subscribe({
      next: (updatedProduct) => {
        this.product = updatedProduct;
        this.notification.showSuccess(
          `Producto ${newStatus ? 'activado' : 'desactivado'} correctamente`
        );
      }
    });
  }

  getCategoryName(category: string): string {
    return ProductCategory[category as keyof typeof ProductCategory];
  }
}