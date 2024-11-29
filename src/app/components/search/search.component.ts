import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './search.component.html',
  styleUrl: './search.component.css'
})
export class SearchComponent {
  @Input() placeHolder: string = '';
  @Output() searchChange = new EventEmitter<string>();

  searchQuery: string = '';

  onSearch(event: Event) {
    event.preventDefault();
    this.searchChange.emit(this.searchQuery);
  }

  resetSearch(): void {
    this.searchQuery = ''; // Mengosongkan nilai input
    this.searchChange.emit(this.searchQuery);
  }
}
