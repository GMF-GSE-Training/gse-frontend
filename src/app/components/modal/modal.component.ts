import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IconActionComponent } from "../icon-action/icon-action.component";
import { PaginationComponent } from "../pagination/pagination.component";
import { SearchComponent } from "../search/search.component";
import { BlueButtonComponent } from "../button/blue-button/blue-button.component";
import { WhiteButtonComponent } from "../button/white-button/white-button.component";

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [
    CommonModule,
    IconActionComponent,
    PaginationComponent,
    SearchComponent,
    BlueButtonComponent,
    WhiteButtonComponent
],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.css'
})
export class ModalComponent {
  @Input() columns: { header: string, field: string }[] = [];
  @Input() data: any[] = [];
  @Output() selectedIdsChange = new EventEmitter<Set<number | string>>();
  @Output() save = new EventEmitter<void>();
  @Output() cancel = new EventEmitter<void>();

  selectedIds: Set<number | string> = new Set();

  // Pagination properties
  @Input() currentPage: number = 1;
  @Input() totalPage: number = 10; // Jumlah item per halaman
  @Output() pageChange = new EventEmitter<number>();

  @Input() placeHolder: string = '';
  @Output() searchChange = new EventEmitter<string>();

  onSearchChanged(query: string) {
    this.searchChange.emit(query);
  }

  onPageChanged(page: number | string) {
    if (typeof page === 'number' && page !== this.currentPage) {
      this.pageChange.emit(page);
    }
  }

  onSelectChange(itemId: number | string) {
    if (this.selectedIds.has(itemId)) {
      this.selectedIds.delete(itemId);
    } else {
      this.selectedIds.add(itemId);
    }
    this.selectedIdsChange.emit(this.selectedIds);
  }

  onSave() {
    this.save.emit();
  }

  onCancel() {
    this.cancel.emit();
  }
}
