import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-input-file',
  standalone: true,
  imports: [],
  templateUrl: './input-file.component.html',
  styleUrl: './input-file.component.css',
})
export class InputFileComponent {
  @Input() idInput!: string;
  fileName: string | null = null;

  @Output() valueChange = new EventEmitter<File | null>();

  onFileSelected(event: Event): void {
    console.log('Event:', event);
    const input = event.target as HTMLInputElement;
    console.log('Input:', input);
    if (input && input.files && input.files.length > 0) {
      this.fileName = input.files[0].name;
      console.log('File selected:', input.files[0].name);
      this.valueChange.emit(input.files[0]);
    } else {
      this.fileName = null;
      this.valueChange.emit(null);
    }
  }
}
