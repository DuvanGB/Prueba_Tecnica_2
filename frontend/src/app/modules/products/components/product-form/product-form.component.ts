import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from '../../models/product.interface';
import { ProductService } from '../../services/product.service';
import { NotificationService } from '../../../../core/services/notification.service';
import { ProductCategory } from '../../models/product-category.enum';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  imports: [
    CommonModule,   
    FormsModule,
    ReactiveFormsModule
  ],
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit {
  productForm: FormGroup;
  isEditMode = false;
  productId?: number;
  loading = false;
  categories = Object.values(ProductCategory);

  constructor(
    private fb: FormBuilder,
    private productService: ProductService,
    private notification: NotificationService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.productForm = this.fb.group({
      name: ['', [Validators.required, Validators.maxLength(100)]],
      description: ['', [Validators.required, Validators.maxLength(500)]],
      price: ['', [Validators.required, Validators.min(0.01)]],
      stockQuantity: ['', [Validators.required, Validators.min(0)]],
      category: ['', Validators.required],
      active: [true],
      imageUrl: ['']
    });
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      if (params['id']) {
        this.isEditMode = true;
        this.productId = +params['id'];
        this.loadProduct(this.productId);
      }
    });
  }

  loadProduct(id: number): void {
    this.loading = true;
    this.productService.getProductById(id).subscribe({
      next: (product) => {
        this.productForm.patchValue(product);
        this.loading = false;
      },
      error: (err) => {
        this.notification.showError('Error al cargar el producto');
        this.loading = false;
      }
    });
  }

  onSubmit(): void {
    if (this.productForm.invalid) return;

    this.loading = true;
    const productData = this.productForm.value;

    const operation = this.isEditMode && this.productId
      ? this.productService.updateProduct(this.productId, productData)
      : this.productService.createProduct(productData);

    operation.subscribe({
      next: (product) => {
        this.notification.showSuccess(
          `Producto ${this.isEditMode ? 'actualizado' : 'creado'} correctamente`
        );
        this.router.navigate(['/products', product.id]);
      },
      error: (err) => {
        this.notification.showError(
          `Error al ${this.isEditMode ? 'actualizar' : 'crear'} el producto`
        );
        this.loading = false;
      }
    });
  }

  getCategoryName(category: string): string {
    return ProductCategory[category as keyof typeof ProductCategory];
  }
}