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
  @Input() fileType: string = '';

  @Output() valueChange = new EventEmitter<File | null>();

  get displayFileName(): string {
    return this.fileName || 'Unggah file maksimal 2 MB dengan format png, jpg, jpeg, atau pdf';
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
