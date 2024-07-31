import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-icon-action',
  standalone: true,
  imports: [
    RouterLink
  ],
  templateUrl: './icon-action.component.html',
  styleUrl: './icon-action.component.css',
})
export class IconActionComponent {
  @Input() editLink: string = '';
  @Input() detailLink: string = '';
  @Input() delete!: () => void;
}
