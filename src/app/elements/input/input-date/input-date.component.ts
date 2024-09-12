import { Component, EventEmitter, forwardRef, Output } from '@angular/core';
import { FormsModule, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-input-date',
  standalone: true,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputDateComponent),
      multi: true,
    },
  ],
  imports: [FormsModule],
  templateUrl: './input-date.component.html',
  styleUrl: './input-date.component.css'
})
export class InputDateComponent {
  @Output() valueChange = new EventEmitter<string>();

  value: string = '';

  private onChange = (value: string) => {};
  private onTouched = () => {};

  writeValue(value: string): void {
    this.value = value;
  }

  registerOnChange(fn: (value: string) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  onValueChange(): void {
    this.onChange(this.value);
    this.onTouched();
    this.valueChange.emit(this.value);
  }
}
