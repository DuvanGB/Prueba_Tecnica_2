import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';

// Components
import { LoadingSpinnerComponent } from './components/loading-spinner/loading-spinner.component';
import { ErrorMessageComponent } from './components/error-message/error-message.component';
import { ConfirmDialogComponent } from './components/confirm-dialog/confirm-dialog.component';

// Directives
import { HoverHighlightDirective } from './directives/hover-highlight.directive';
import { RoleAccessDirective } from './directives/role-access.directive';

// Pipes
import { TruncatePipe } from './pipes/truncate.pipe';
import { FilterPipe } from './pipes/filter.pipe';

@NgModule({
  imports: [
    LoadingSpinnerComponent,
    ErrorMessageComponent,
    ConfirmDialogComponent,
    HoverHighlightDirective,
    RoleAccessDirective,
    TruncatePipe,
    FilterPipe,
    CommonModule,
    NgbModule,
    FormsModule
  ],
  exports: [
    // Modules
    CommonModule,
    FormsModule,
    
    // Components
    LoadingSpinnerComponent,
    ErrorMessageComponent,
    
    // Directives
    HoverHighlightDirective,
    RoleAccessDirective,
    
    // Pipes
    TruncatePipe,
    FilterPipe
  ],
  // entryComponents: [
  //   ConfirmDialogComponent
  // ]
})
export class SharedModule { }