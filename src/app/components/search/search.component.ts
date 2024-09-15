import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [],
  templateUrl: './search.component.html',
  styleUrl: './search.component.css'
})
export class SearchComponent {
  @Input() placeHolder: string = '';
  @Output() searchChange = new EventEmitter<string>();

  onSearch(query: string) {
    this.searchChange.emit(query);
  }
}
