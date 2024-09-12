import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-detailed-view',
  standalone: true,
  imports: [
    CommonModule
  ],
  templateUrl: './detailed-view.component.html',
  styleUrl: './detailed-view.component.css'
})
export class DetailedViewComponent {
  constructor(private router:Router) {}

  @Input() leftTableData: {label: string, value: string}[] = [];
  @Input() rightTableData: {label: string, value: string, link?: string}[] = [];

  lihatDokumen(link: string): void {
    this.router.navigate([link]);
  }
}
