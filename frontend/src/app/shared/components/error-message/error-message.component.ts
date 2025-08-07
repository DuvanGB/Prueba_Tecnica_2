import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  imports: [
    CommonModule,   
    FormsModule
  ],
  selector: 'app-error-message',
  templateUrl: './error-message.component.html',
  styleUrls: ['./error-message.component.css']
})
export class ErrorMessageComponent {
  @Input() message = 'Ocurrió un error inesperado';
  @Input() showIcon = true;
  @Input() dismissible = false;
  isDismissed = false;
}