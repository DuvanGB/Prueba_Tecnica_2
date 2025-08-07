import { Component, OnInit } from '@angular/core';
import { Product } from '../../models/product.interface';
import { ProductService } from '../../services/product.service';
import { NotificationService } from '../../../../core/services/notification.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router'; 
import { ProductCategory } from '../../models/product-category.enum';

@Component({
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule], 
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  products: Product[] = [];
  filteredProducts: Product[] = [];
  loading = false;
  searchTerm = '';
  categoryFilter = '';
  ProductCategory = ProductCategory;

  constructor(
    private productService: ProductService,
    private notification: NotificationService
  ) {}

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts(): void {
    this.loading = true;
    this.productService.getProducts().subscribe({
      next: (products) => {
        this.products = products;
        this.filteredProducts = products;
        this.loading = false;
      },
      error: (err) => {
        this.notification.showError('Error al cargar productos');
        this.loading = false;
      }
    });
  }

  applyFilters(): void {
    this.filteredProducts = this.products.filter(product => {
      const matchesSearch = product.name.toLowerCase().includes(this.searchTerm.toLowerCase()) || 
                          product.description.toLowerCase().includes(this.searchTerm.toLowerCase());
      const matchesCategory = !this.categoryFilter || 
                            product.category === this.categoryFilter as unknown as ProductCategory;
      return matchesSearch && matchesCategory;
    });
  }

  deleteProduct(id: number): void {
    if (confirm('¿Estás seguro de eliminar este producto?')) {
      this.productService.deleteProduct(id).subscribe({
        next: () => {
          this.products = this.products.filter(p => p.id !== id);
          this.filteredProducts = this.filteredProducts.filter(p => p.id !== id);
          this.notification.showSuccess('Producto eliminado correctamente');
        },
        error: (err) => {
          this.notification.showError('Error al eliminar producto');
        }
      });
    }
  }

  enumKeys(obj: any): string[] {
    return Object.keys(obj).filter(key => isNaN(Number(key)));
  }

  getCategoryName(category: string): string {
    return ProductCategory[category as keyof typeof ProductCategory];
  }
}