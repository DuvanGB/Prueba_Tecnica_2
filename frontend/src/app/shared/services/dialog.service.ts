import { Injectable } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ConfirmDialogComponent } from '../components/confirm-dialog/confirm-dialog.component';

@Injectable({
  providedIn: 'root'
})
export class DialogService {
  constructor(private modalService: NgbModal) {}

  confirm(
    title: string,
    message: string,
    confirmText = 'Confirmar',
    cancelText = 'Cancelar'
  ): Promise<boolean> {
    const modalRef = this.modalService.open(ConfirmDialogComponent);
    modalRef.componentInstance.title = title;
    modalRef.componentInstance.message = message;
    modalRef.componentInstance.confirmText = confirmText;
    modalRef.componentInstance.cancelText = cancelText;

    return modalRef.result;
  }
}