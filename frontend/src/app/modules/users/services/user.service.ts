import { Injectable } from '@angular/core';
import { ApiService } from '../../../core/services/api.service';
import { Observable } from 'rxjs';
import { User, UserProfile } from '../models/user.interface';
import { UserRole } from '../models/user-role.enum';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private api: ApiService) {}

  getUsers(): Observable<User[]> {
    return this.api.get<User[]>('users');
  }

  getUserById(id: number): Observable<User> {
    return this.api.get<User>(`users/${id}`);
  }

  createUser(user: User): Observable<User> {
    return this.api.post<User>('users', user);
  }

  updateUser(id: number, user: User): Observable<User> {
    return this.api.put<User>(`users/${id}`, user);
  }

  deleteUser(id: number): Observable<void> {
    return this.api.delete<void>(`users/${id}`);
  }

  updateProfile(id: number, profile: UserProfile): Observable<User> {
    return this.api.patch<User>(`users/${id}/profile`, profile);
  }

  updateRoles(id: number, roles: UserRole[]): Observable<User> {
    return this.api.patch<User>(`users/${id}/roles`, { roles });
  }

  markAsFrequentCustomer(id: number): Observable<User> {
    return this.api.patch<User>(`users/${id}/frequent`, {});
  }

  searchUsers(term: string): Observable<User[]> {
    return this.api.get<User[]>('users/search', { q: term });
  }
}