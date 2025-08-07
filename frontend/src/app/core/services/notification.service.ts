import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

export type NotificationType = 'success' | 'error' | 'warning' | 'info';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  constructor(private toastr: ToastrService) {}

  show(
    message: string,
    type: NotificationType = 'info',
    title?: string,
    config?: any
  ): void {
    switch (type) {
      case 'success':
        this.toastr.success(message, title, config);
        break;
      case 'error':
        this.toastr.error(message, title, config);
        break;
      case 'warning':
        this.toastr.warning(message, title, config);
        break;
      default:
        this.toastr.info(message, title, config);
    }
  }

  showSuccess(message: string, title?: string): void {
    this.show(message, 'success', title);
  }

  showError(message: string, title?: string): void {
    this.show(message, 'error', title);
  }

  showWarning(message: string, title?: string): void {
    this.show(message, 'warning', title);
  }

  showInfo(message: string, title?: string): void {
    this.show(message, 'info', title);
  }
}