import { Component, EventEmitter, Input, Output } from '@angular/core';
import { BlueButtonComponent } from "../button/blue-button/blue-button.component";
import { RedButtonComponent } from '../button/red-button/red-button.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-confirm',
  standalone: true,
  imports: [
    BlueButtonComponent,
    RedButtonComponent,
    CommonModule,
  ],
  templateUrl: './confirm.component.html',
  styleUrl: './confirm.component.css',
})
export class ConfirmComponent {
  @Input() message: string = '';
  @Output() confirm = new EventEmitter<void>();
  @Output() cancel = new EventEmitter<void>();

  onConfirm() {
    this.confirm.emit();
  }

  onCancel() {
    this.cancel.emit();
  }
}
