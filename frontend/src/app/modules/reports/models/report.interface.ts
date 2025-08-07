import { Product } from '../../products/models/product.interface';
import { User } from '../../users/models/user.interface';

export interface ActiveProductsReport {
  product: Product;
  salesCount: number;
  lastSaleDate: string;
}

export interface TopProductsReport {
  product: Product;
  totalSold: number;
  totalRevenue: number;
}

export interface FrequentCustomersReport {
  user: User;
  orderCount: number;
  totalSpent: number;
  lastOrderDate: string;
}