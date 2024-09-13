import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-blue-button',
  standalone: true,
  imports: [],
  templateUrl: './blue-button.component.html',
  styleUrl: './blue-button.component.css'
})
export class BlueButtonComponent {
  @Input() type: string = 'button';
  @Input() disabled: boolean = false;
  @Output() buttonClick = new EventEmitter<void>();

  onClick() {
    this.buttonClick.emit();
  }
}
