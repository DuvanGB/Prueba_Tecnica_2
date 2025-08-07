import { Component, EventEmitter, Output } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { Product } from '../../models/product.interface';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  imports: [
    CommonModule,   
    FormsModule
  ],
  selector: 'app-product-search',
  templateUrl: './product-search.component.html',
  styleUrls: ['./product-search.component.css']
})
export class ProductSearchComponent {
  @Output() searchResults = new EventEmitter<Product[]>();
  searchTerm = '';

  constructor(private productService: ProductService) {}

  search(): void {
    if (this.searchTerm.trim()) {
      this.productService.searchProducts(this.searchTerm).subscribe({
        next: (products) => {
          this.searchResults.emit(products);
        },
        error: (err) => {
          console.error('Search error:', err);
          this.searchResults.emit([]);
        }
      });
    } else {
      this.searchResults.emit([]);
    }
  }
}