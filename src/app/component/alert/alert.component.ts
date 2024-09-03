import { Component, EventEmitter, Input, Output } from '@angular/core';
import { BlueButtonComponent } from "../button/blue-button/blue-button.component";

@Component({
  selector: 'app-alert',
  standalone: true,
  imports: [BlueButtonComponent],
  templateUrl: './alert.component.html',
  styleUrl: './alert.component.css'
})
export class AlertComponent {
  @Input() message: string = '';
  @Output() close = new EventEmitter<void>();

  onClose() {
    this.close.emit();
  }
}
