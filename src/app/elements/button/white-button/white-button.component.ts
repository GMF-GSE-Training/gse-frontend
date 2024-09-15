import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-white-button',
  standalone: true,
  imports: [],
  templateUrl: './white-button.component.html',
  styleUrl: './white-button.component.css'
})
export class WhiteButtonComponent {
  @Output() whiteButtonClick = new EventEmitter<void>();

  onWhiteButtonClick() {
    this.whiteButtonClick.emit();
  }
}
