import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

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
  @Input() leftTableData: {label: string, value: string}[] = [];
  @Input() rightTableData: {label: string, value: string}[] = [];
}
