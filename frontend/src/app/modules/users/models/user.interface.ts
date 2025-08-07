import { UserRole } from './user-role.enum';

export interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  roles: UserRole[];
  isFrequentCustomer: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface UserProfile {
  name: string;
  email: string;
  phone?: string;
  address?: string;
}