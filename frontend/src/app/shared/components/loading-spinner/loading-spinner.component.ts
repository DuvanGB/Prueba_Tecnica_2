import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common'; 

@Component({
  imports: [CommonModule],
  selector: 'app-loading-spinner',
  templateUrl: './loading-spinner.component.html',
  styleUrls: ['./loading-spinner.component.css']
})
export class LoadingSpinnerComponent {
  @Input() message = 'Cargando...';
  @Input() size: 'sm' | 'md' | 'lg' = 'md';
}