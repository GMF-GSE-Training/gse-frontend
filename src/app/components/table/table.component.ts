import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { IconActionComponent } from "../icon-action/icon-action.component";

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    IconActionComponent
],
  templateUrl: './table.component.html',
  styleUrl: './table.component.css'
})
export class  TableComponent {
  @Input() columns: { header: string, field: string }[] = [];
  @Input() data: any[] = [];

  // Metode untuk memeriksa apakah kolom action memiliki nilai
  hasActionColumn(): boolean {
    return this.data.some(item =>
      item.printLink || item.addLink || item.editLink || item.deleteMethod || item.detailLink || item.select
    );
  }
}
