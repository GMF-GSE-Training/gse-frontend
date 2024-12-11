import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { debounceTime, Subject } from 'rxjs';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './search.component.html',
  styleUrl: './search.component.css'
})
export class SearchComponent {
  @Input() placeHolder: string = '';
  @Input() autoSearchClear: boolean = false;
  @Output() searchChange = new EventEmitter<string>();
  @Output() searchCleared = new EventEmitter<void>();
  private searchSubject = new Subject<string>();
  searchQuery: string = '';

  ngOnInit() {
    this.searchSubject.pipe(debounceTime(300)).subscribe((query) => {
      this.searchChange.emit(query);
    });
  }

  onSearch(event: Event) {
    event.preventDefault();
    this.searchChange.emit(this.searchQuery);
  }

  onSearchInputChange() {
    if (this.searchQuery === '') {
      this.searchCleared.emit();
    } else {
      this.searchSubject.next(this.searchQuery);
    }
  }

  resetSearch(): void {
    this.searchQuery = ''; // Mengosongkan nilai input
    this.searchChange.emit(this.searchQuery);
  }
}
