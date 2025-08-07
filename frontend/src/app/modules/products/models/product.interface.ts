import { ProductCategory } from './product-category.enum';

export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  stockQuantity: number;
  category: ProductCategory;
  active: boolean;
  createdAt: string;
  updatedAt: string;
  imageUrl?: string;
}