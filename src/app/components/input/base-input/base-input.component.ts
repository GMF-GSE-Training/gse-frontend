import { CommonModule } from '@angular/common';
import { Component, EventEmitter, forwardRef, Input, Output } from '@angular/core';
import { FormsModule, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-base-input',
  standalone: true,
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => BaseInputComponent),
    multi: true
  }],
  imports: [
    FormsModule,
    CommonModule,
  ],
  templateUrl: './base-input.component.html',
  styleUrl: './base-input.component.css'
})
export class BaseInputComponent {
  @Input() label: string = '';
  @Input() type: string = '';
  @Input() inputMode: string = '';
  @Input() placeholder: string = '';
  @Input() name: string = '';
  @Input() value: string = '';
  @Input() disabled: boolean = false; 

  @Output() valueChange = new EventEmitter<string>();

  onChange = (value: string) => {};
  onTouched = () => {};

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
