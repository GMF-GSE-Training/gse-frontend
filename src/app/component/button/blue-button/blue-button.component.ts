import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-blue-button',
  standalone: true,
  imports: [],
  templateUrl: './blue-button.component.html',
  styleUrl: './blue-button.component.css'
})
export class BlueButtonComponent {
  @Output() buttonClick = new EventEmitter<void>();

  onClick() {
    this.buttonClick.emit();
  }
}
