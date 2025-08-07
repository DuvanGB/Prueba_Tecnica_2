import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-server-error',
  templateUrl: './server-error.component.html',
  styleUrls: ['./server-error.component.css']
})
export class ServerErrorComponent {
  constructor(private router: Router) {}

  reloadPage(): void {
    window.location.reload();
  }

  goHome(): void {
    this.router.navigate(['/']);
  }
}