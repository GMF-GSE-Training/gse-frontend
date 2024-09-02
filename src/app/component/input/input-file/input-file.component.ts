import { Component, EventEmitter, forwardRef, Input, Output } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-input-file',
  standalone: true,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputFileComponent),
      multi: true,
    },
  ],
  imports: [],
  templateUrl: './input-file.component.html',
  styleUrl: './input-file.component.css',
})
export class InputFileComponent {
  @Input() idInput!: string;
  fileName: string | null = null;

  @Output() valueChange = new EventEmitter<File | null>();

  private onChange = (file: File | null) => {};
  private onTouched = () => {};

  writeValue(file: File | null): void {
    this.fileName = file ? file.name : null;
  }

  registerOnChange(fn: (file: File | null) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input && input.files && input.files.length > 0) {
      this.fileName = input.files[0].name;
      this.valueChange.emit(input.files[0]);
    } else {
      this.fileName = null;
      this.valueChange.emit(null);
    }
  }
}
