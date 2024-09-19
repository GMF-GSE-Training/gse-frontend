import { Component, EventEmitter, forwardRef, Input, Output } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-file-input',
  standalone: true,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => FileInputComponent),
      multi: true,
    },
  ],
  imports: [],
  templateUrl: './file-input.component.html',
  styleUrl: './file-input.component.css',
})
export class FileInputComponent {
  @Input() label: string = '';
  @Input() idInput!: string;
  @Input() fileName: string | null = null;

  @Output() valueChange = new EventEmitter<File | null>();

  get displayFileName(): string {
    return this.fileName || 'Tidak ada file dipilih';
  }

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
