import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-input-date',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './input-date.component.html',
  styleUrl: './input-date.component.css'
})
export class InputDateComponent {
  @Output() valueChange = new EventEmitter<string>();

  value: string = '';

  onValueChange() {
    this.valueChange.emit(this.value);
  }
}
