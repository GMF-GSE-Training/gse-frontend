import { Component, EventEmitter, Input, Output } from '@angular/core';
import { TitleComponent } from "../../components/title/title.component";
import { SearchComponent } from "../../components/search/search.component";
import { ViewAllComponent } from "../../components/view-all/view-all.component";
import { TableComponent } from "../../components/table/table.component";
import { WhiteButtonComponent } from "../../components/button/white-button/white-button.component";
import { BlueButtonComponent } from "../../components/button/blue-button/blue-button.component";
import { PaginationComponent } from "../../components/pagination/pagination.component";
import { RoleBasedAccessDirective } from '../../shared/directive/role-based-access.directive';

@Component({
  selector: 'app-data-management',
  standalone: true,
  imports: [
    TitleComponent,
    SearchComponent,
    ViewAllComponent,
    TableComponent,
    WhiteButtonComponent,
    BlueButtonComponent,
    PaginationComponent,
    RoleBasedAccessDirective,
  ],
  templateUrl: './data-management.component.html',
  styleUrl: './data-management.component.css'
})
export class DataManagementComponent {
  // Komponent title
  @Input() pageTitle: string = '';

  // Komponen tabel
  @Input() columns: { header: string, field: string }[] = [];
  @Input() data: any[] = [];

  // Komponen pagination
  @Input() totalPages: number = 0;
  @Input() currentPage = 1;
  @Output() pageChange = new EventEmitter<number>();

  onPageChanged(page: number | string) {
    if (typeof page === 'number' && page !== this.currentPage) {
      this.pageChange.emit(page);
    }
  }

  // Komponen search
  @Input() placeHolder: string = '';
  @Output() searchChange = new EventEmitter<string>();

  onSearchChanged(query: string) {
    this.searchChange.emit(query);
  }

  // Komponen view all
  @Output() viewAllChange = new EventEmitter();

  viewAll() {
    this.viewAllChange.emit();
  }

  // Komponen blue button
  @Output() blueButtonClick = new EventEmitter<void>();

  onBlueButtonClick() {
    this.blueButtonClick.emit();
  }

  // Komponen white button
  @Output() whiteButtonClick = new EventEmitter<void>();

  onWhiteButtonClick() {
    this.whiteButtonClick.emit();
  }

  // Role Based Access
  @Input() roleBassedAccess: string[] = [];
}
