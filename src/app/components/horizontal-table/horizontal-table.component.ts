import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { RoleBasedAccessDirective } from '../../shared/directive/role-based-access.directive';

@Component({
  selector: 'app-horizontal-table',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    RoleBasedAccessDirective
],
  templateUrl: './horizontal-table.component.html',
  styleUrl: './horizontal-table.component.css'
})
export class HorizontalTableComponent {
  constructor(private router:Router) {}

  @Input() leftTableData: {label: string, value?: string, link?: string}[] = [];
  @Input() rightTableData: {label: string, value?: string, link?: string}[] = [];
  @Input() isParticipantDetail: boolean = false;

  @Output() downloadDocumentClick = new EventEmitter<void>();

  lihatDokumen(link: string): void {
    this.router.navigate([link]);
  }

  downloadDocument() {
    this.downloadDocumentClick.emit();
  }
}
